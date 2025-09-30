import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createWorker } from "tesseract.js";
import {
  Camera,
  Upload,
  Copy,
  Trash2,
  FileText,
  Download,
  Scan,
  Zap,
  Shield,
  CheckCircle,
  RotateCcw,
  Languages,
  Play,
} from "lucide-react";

const OCRComponent = () => {
  // State management
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [formattedText, setFormattedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [cameraError, setCameraError] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enhanceWithAI, setEnhanceWithAI] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("eng");
  const [needsUserInteraction, setNeedsUserInteraction] = useState(false);

  // Refs
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const textAreaRef = useRef(null);
  const streamRef = useRef(null);

  // Language options
  const languages = [
    { code: "eng", name: "English" },
    { code: "hin", name: "Hindi" },
    { code: "ben", name: "Bengali" },
    { code: "tam", name: "Tamil" },
    { code: "tel", name: "Telugu" },
    { code: "urd", name: "Urdu" },
    { code: "ara", name: "Arabic" },
    { code: "spa", name: "Spanish" },
    { code: "fre", name: "French" },
    { code: "deu", name: "German" },
  ];

  // Check camera support
  const checkCameraSupport = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera not supported in this browser");
      return false;
    }
    return true;
  };

  // Force video play with retry logic
  const forceVideoPlay = async (videoElement, attempt = 0) => {
    try {
      await videoElement.play();
      console.log("Video play successful on attempt", attempt + 1);
      setNeedsUserInteraction(false);
      return true;
    } catch (error) {
      if (attempt < 2) {
        console.log(`Play attempt ${attempt + 1} failed, retrying...`);
        await new Promise((resolve) => setTimeout(resolve, 300));
        return forceVideoPlay(videoElement, attempt + 1);
      } else {
        console.log(
          "All auto-play attempts failed, requiring user interaction"
        );
        setNeedsUserInteraction(true);
        return false;
      }
    }
  };

  // Enhanced camera function with play fixes
  const startCamera = async () => {
    if (!checkCameraSupport()) return;

    setIsLoading(true);
    setCameraError("");
    setNeedsUserInteraction(false);

    try {
      // Stop existing stream first
      if (streamRef.current) {
        stopCamera();
      }

      // Try different camera configurations
      const configs = [
        { facingMode: "environment" }, // Rear camera
        { facingMode: "user" }, // Front camera
        {}, // No constraints (browser default)
      ];

      let mediaStream;
      let lastError;

      for (const config of configs) {
        try {
          const constraints = {
            video: config,
          };

          mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
          console.log("Camera activated successfully");
          break;
        } catch (error) {
          lastError = error;
          console.warn("Camera config failed:", config, error);
          continue;
        }
      }

      if (!mediaStream) {
        throw lastError || new Error("All camera configurations failed");
      }

      streamRef.current = mediaStream;
      setIsCameraActive(true);

      // Setup video element
      if (videoRef.current) {
        const video = videoRef.current;
        video.srcObject = mediaStream;

        // Wait for video to load metadata
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("Camera timeout - metadata not loaded"));
          }, 3000);

          video.onloadedmetadata = () => {
            clearTimeout(timeout);
            console.log("Video metadata loaded, attempting to play...");
            resolve();
          };

          video.onerror = (error) => {
            clearTimeout(timeout);
            reject(new Error("Video element error: " + error));
          };
        });

        // Attempt to play the video
        await forceVideoPlay(video);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Camera access error:", error);
      handleCameraError(error);
      setIsLoading(false);
      stopCamera();
    }
  };

  // Manual play function for user interaction
  const manualPlayVideo = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setNeedsUserInteraction(false);
        console.log("Manual play successful");
      } catch (error) {
        console.error("Manual play failed:", error);
        setCameraError("Failed to start camera. Please refresh the page.");
      }
    }
  };

  const handleCameraError = (error) => {
    switch (error.name) {
      case "NotAllowedError":
        setCameraError(
          "Camera access denied. Please allow camera permissions in your browser settings."
        );
        break;
      case "NotFoundError":
        setCameraError("No camera found on this device.");
        break;
      case "NotSupportedError":
        setCameraError(
          "Camera not supported in your browser. Try using Chrome or Firefox."
        );
        break;
      case "OverconstrainedError":
        setCameraError(
          "Camera constraints cannot be satisfied. Please try again."
        );
        break;
      default:
        setCameraError(`Camera error: ${error.message || "Unknown error"}`);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setCameraError("");
    setNeedsUserInteraction(false);

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureImage = () => {
    if (
      videoRef.current &&
      canvasRef.current &&
      videoRef.current.readyState >= 2
    ) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = canvas.toDataURL("image/jpeg", 0.9);
      setImage(imageData);
      setExtractedText("");
      setFormattedText("");
      stopCamera();
    } else {
      setCameraError("Camera not ready. Please wait for video feed to load.");
    }
  };

  // Enhanced text reconstruction
  const reconstructTextLayout = (text) => {
    if (!text) return "";

    let cleanedText = text
      .replace(/\r\n/g, "\n")
      .replace(/\n\s*\n/g, "\n\n")
      .replace(/[^\S\n]+/g, " ")
      .trim();

    const lines = cleanedText.split("\n");
    const processedLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.length === 0) continue;

      if (
        i > 0 &&
        processedLines.length > 0 &&
        line.length > 0 &&
        !line.match(/^[A-Z][^a-z]*$/) &&
        line[0] === line[0].toLowerCase()
      ) {
        const lastLine = processedLines.pop();
        processedLines.push(lastLine + " " + line);
      } else {
        processedLines.push(line);
      }
    }

    return processedLines.join("\n");
  };

  // AI-powered text enhancement
  const enhanceTextWithAI = async (text) => {
    if (!enhanceWithAI) return reconstructTextLayout(text);

    try {
      const reconstructedText = reconstructTextLayout(text);
      const lines = reconstructedText
        .split("\n")
        .filter((line) => line.trim().length > 2);

      if (lines.length === 0) return "No readable text found.";

      const patterns = {
        name: /(name|student|full name|student name|candidate|holder)[\s:*-]*([a-zA-Z][a-zA-Z\s\.]{2,})/gi,
        institution:
          /(university|college|institute|institution|school|board|academy)[\s:*-]*([a-zA-Z][a-zA-Z\s\.&]{2,})/gi,
        degree:
          /(degree|program|course|bachelor|master|phd|diploma|certificate|graduation)[\s:*-]*([a-zA-Z][a-zA-Z\s\.]{2,})/gi,
        date: /(date|issued|graduation|year|completed|awarded|on)[\s:*-]*([0-9]{1,2}[\/\-\.][0-9]{1,2}[\/\-\.][0-9]{4}|[0-9]{4})/gi,
        id: /(id|number|certificate|roll|registration|serial|no\.|#)[\s:*-]*([a-zA-Z0-9\-\s]{3,})/gi,
        gpa: /(gpa|grade|score|cgpa|percentage|marks|result)[\s:*-]*([0-9\.\s%]{2,})/gi,
        honors:
          /(honors|distinction|merit|first class|second class|with praise)/gi,
      };

      let enhancedText = "=== AI-ENHANCED TEXT EXTRACTION ===\n\n";
      const extractedData = {};

      Object.entries(patterns).forEach(([key, pattern]) => {
        const matches = [...reconstructedText.matchAll(pattern)];
        if (matches.length > 0) {
          extractedData[key] = matches[0][2]?.trim();
        }
      });

      if (Object.keys(extractedData).length > 0) {
        enhancedText += "📋 EXTRACTED INFORMATION:\n\n";
        Object.entries(extractedData).forEach(([key, value]) => {
          if (value) {
            enhancedText += `• ${
              key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")
            }: ${value}\n`;
          }
        });
        enhancedText += "\n";
      }

      const confidence = calculateConfidence(reconstructedText);
      enhancedText += `🔍 CONFIDENCE LEVEL: ${confidence}\n\n`;
      enhancedText += "📄 RECONSTRUCTED TEXT:\n\n";
      enhancedText += reconstructedText;

      return enhancedText;
    } catch (error) {
      console.error("AI enhancement error:", error);
      return reconstructTextLayout(text);
    }
  };

  const calculateConfidence = (text) => {
    const wordCount = text
      .split(/\s+/)
      .filter((word) => word.length > 1).length;
    const lineCount = text
      .split("\n")
      .filter((line) => line.trim().length > 10).length;
    const avgWordLength =
      text.replace(/[^a-zA-Z]/g, "").length / Math.max(wordCount, 1);

    if (wordCount > 15 && lineCount > 2 && avgWordLength > 3) return "High ✅";
    if (wordCount > 8 && lineCount > 1) return "Medium ⚠️";
    return "Low ❌";
  };

  // File handling
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (streamRef.current) {
        stopCamera();
      }

      if (!file.type.startsWith("image/")) {
        setCameraError("Please select an image file (JPEG, PNG, etc.)");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        setExtractedText("");
        setFormattedText("");
      };
      reader.readAsDataURL(file);
    }
  };

  // Main OCR function
  const extractText = async () => {
    if (!image) {
      alert("Please upload or capture an image first.");
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setStatus("Initializing OCR engine...");
    setExtractedText("");
    setFormattedText("");

    try {
      const worker = await createWorker(selectedLanguage, 1, {
        logger: (m) => {
          if (m.status === "recognizing text") {
            const currentProgress = Math.round(m.progress * 100);
            setProgress(currentProgress);
            setStatus(`Processing: ${currentProgress}%`);
          } else {
            setStatus(m.status);
          }
        },
      });

      await worker.setParameters({
        tessedit_pageseg_mode: "6",
        tessedit_ocr_engine_mode: "1",
        tessedit_char_whitelist:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,:-/\\()[]{}@#$%^&*_+=|<>?'\"",
        preserve_interword_spaces: "1",
      });

      const {
        data: { text },
      } = await worker.recognize(image);

      const cleanedText = text
        .replace(/\r\n/g, "\n")
        .replace(/\n\s*\n/g, "\n\n")
        .replace(/[^\S\n]+/g, " ")
        .trim();

      setExtractedText(cleanedText);
      const enhancedText = await enhanceTextWithAI(cleanedText);
      setFormattedText(enhancedText);

      await worker.terminate();
      setStatus(`Extraction completed in ${selectedLanguage.toUpperCase()}!`);
    } catch (error) {
      console.error("OCR Error:", error);
      setStatus("Error occurred during text extraction.");
      setExtractedText(
        "Error: Unable to extract text. Please try with a clearer image or different language setting."
      );
      setFormattedText(
        "Error: Unable to extract text. Please try with a clearer image or different language setting."
      );
    } finally {
      setIsProcessing(false);
      setProgress(100);
    }
  };

  // Utility functions
  const copyToClipboard = async () => {
    const textToCopy = formattedText || extractedText;
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      alert("Text copied to clipboard!");
    } catch (error) {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Text copied to clipboard!");
    }
  };

  const downloadText = () => {
    const textToDownload = formattedText || extractedText;
    if (!textToDownload) return;

    const element = document.createElement("a");
    const file = new Blob([textToDownload], {
      type: "text/plain;charset=utf-8",
    });
    element.href = URL.createObjectURL(file);
    element.download = `extracted-text-${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const clearAll = () => {
    setImage(null);
    setExtractedText("");
    setFormattedText("");
    setProgress(0);
    setStatus("");
    setCameraError("");

    if (streamRef.current) {
      stopCamera();
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Auto-scroll to bottom when text is extracted
  useEffect(() => {
    if (extractedText && textAreaRef.current) {
      setTimeout(() => {
        textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
      }, 100);
    }
  }, [extractedText]);

  // Force play on user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      if (needsUserInteraction && videoRef.current) {
        manualPlayVideo();
      }
    };

    // Add event listeners for user interaction
    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("touchstart", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [needsUserInteraction]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            {/* <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-3 rounded-2xl">
              <Scan className="h-8 w-8 text-white" />
            </div> */}
            <div className="bg-gradient-to-r from-green-600 to-green-800 p-1.5 rounded-lg">
              <Scan className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Advanced OCR Text Extraction
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Extract text from certificates and documents using AI-powered OCR
            with multilingual support
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column - Input Section */}
          <div className="space-y-6">
            {/* Upload/Capture Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <Camera className="h-5 w-5 text-primary-600" />
                <span>Image Source</span>
              </h2>

              {/* Language Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center space-x-2">
                  <Languages className="h-4 w-4 text-primary-600" />
                  <span>Document Language</span>
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name} ({lang.code.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Image</span>
                </button>

                <button
                  onClick={isCameraActive ? stopCamera : startCamera}
                  disabled={isLoading}
                  className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg ${
                    isCameraActive
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <Camera className="h-5 w-5" />
                  <span>
                    {isLoading
                      ? "Loading..."
                      : isCameraActive
                      ? "Stop Camera"
                      : "Use Camera"}
                  </span>
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />

              {/* Camera Preview */}
              <AnimatePresence>
                {isCameraActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6"
                  >
                    <div className="relative bg-black rounded-xl overflow-hidden border-2 border-primary-500">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-64 object-cover"
                        style={{ transform: "scaleX(-1)" }}
                        onLoadedData={() => console.log("Video data loaded")}
                        onCanPlay={() => console.log("Video can play")}
                      />
                      <canvas ref={canvasRef} className="hidden" />

                      {/* Loading Overlay */}
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                          <div className="text-white text-center">
                            <RotateCcw className="w-8 h-8 animate-spin mx-auto mb-2" />
                            <p className="text-sm">Starting camera...</p>
                          </div>
                        </div>
                      )}

                      {/* User Interaction Required Overlay */}
                      {needsUserInteraction && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                          <div className="text-white text-center">
                            <button
                              onClick={manualPlayVideo}
                              className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition-all duration-200 flex items-center space-x-2"
                            >
                              <Play className="h-5 w-5" />
                              <span>Click to Start Camera Feed</span>
                            </button>
                            <p className="text-sm mt-2 text-gray-300">
                              Browser requires user interaction to display
                              camera
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Capture Buttons */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                        <button
                          onClick={captureImage}
                          disabled={isLoading || needsUserInteraction}
                          className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium shadow-lg hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          📸 Capture Image
                        </button>
                        <button
                          onClick={stopCamera}
                          className="bg-red-600 text-white px-4 py-2 rounded-full font-medium shadow-lg hover:bg-red-700 transition-all duration-200"
                        >
                          ❌ Cancel
                        </button>
                      </div>
                    </div>

                    {cameraError && (
                      <div className="mt-2 p-3 bg-red-100 border border-red-300 rounded-lg">
                        <p className="text-red-700 text-sm">{cameraError}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Image Preview */}
              <AnimatePresence>
                {image && !isCameraActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6"
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Image Preview
                    </h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50">
                      <img
                        src={image}
                        alt="Uploaded preview"
                        className="w-full h-48 object-contain rounded-lg mx-auto"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI Enhancement Toggle */}
              <div className="flex items-center space-x-3 mb-6 p-3 bg-blue-50 rounded-lg">
                <input
                  type="checkbox"
                  id="ai-enhance"
                  checked={enhanceWithAI}
                  onChange={(e) => setEnhanceWithAI(e.target.checked)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor="ai-enhance"
                  className="flex items-center space-x-2 text-sm text-gray-700"
                >
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span>Enable AI-powered text enhancement</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={extractText}
                  disabled={isProcessing || !image}
                  className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg ${
                    isProcessing || !image
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                >
                  <FileText className="h-5 w-5" />
                  <span>{isProcessing ? "Processing..." : "Extract Text"}</span>
                </button>

                <button
                  onClick={clearAll}
                  className="flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg"
                >
                  <Trash2 className="h-5 w-5" />
                  <span>Clear All</span>
                </button>
              </div>
            </motion.div>

            {/* Progress Indicator */}
            <AnimatePresence>
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center space-x-2">
                    <RotateCcw className="h-5 w-5 text-primary-600 animate-spin" />
                    <span>Processing Document</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{status}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column - Results Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 h-full flex flex-col"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary-600" />
                  <span>Extracted Text</span>
                </h2>
                {extractedText && (
                  <div className="flex space-x-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={downloadText}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Scrollable Text Area */}
              <div
                ref={textAreaRef}
                className="flex-1 min-h-[500px] max-h-[600px] bg-gray-50 rounded-xl border-2 border-gray-200 overflow-auto scrollbar-thin scrollbar-thumb-primary-300 scrollbar-track-gray-100"
              >
                {extractedText ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4"
                  >
                    <pre className="whitespace-pre-wrap text-gray-800 font-mono text-sm leading-relaxed">
                      {formattedText || extractedText}
                    </pre>
                  </motion.div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500 p-8">
                    <div className="text-center">
                      <Scan className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                      <p className="text-lg font-medium text-gray-400">
                        No text extracted yet
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Upload or capture an image to begin extraction
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Text Statistics */}
              {extractedText && (
                <div className="mt-4 p-3 bg-primary-50 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-xs text-primary-800">
                    <div className="text-center">
                      <div className="font-semibold">
                        {extractedText.length}
                      </div>
                      <div>Characters</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">
                        {
                          extractedText
                            .split(/\s+/)
                            .filter((word) => word.length > 0).length
                        }
                      </div>
                      <div>Words</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold">
                        {
                          extractedText
                            .split("\n")
                            .filter((line) => line.trim().length > 0).length
                        }
                      </div>
                      <div>Lines</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-6 border border-primary-200"
        >
          <h3 className="font-semibold text-primary-900 mb-3 flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary-600" />
            <span>Best Practices for Optimal Results</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-primary-800">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>
                  Click "Start Camera Feed" if video doesn't auto-play
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>
                  Select correct document language for better accuracy
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Use high-resolution images with good lighting</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Position camera directly above documents</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Enable AI enhancement for structured output</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Allow camera permissions when prompted</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OCRComponent;
