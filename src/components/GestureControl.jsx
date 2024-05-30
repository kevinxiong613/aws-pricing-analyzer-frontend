import React, { useRef, useEffect, useState } from "react";

const GestureControl = () => {
    // Use a ref to store the video element
    const videoRef = useRef(null);
    // Use state to store the WebSocket instance
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // Function to initialize and start the WebSocket connection
        const startWebSocket = () => {
            // Create a new WebSocket instance and connect to the server
            const socket = new WebSocket("ws://localhost:5002");

            // When the WebSocket connection is opened, set for this function to happen
            socket.onopen = () => console.log("WebSocket connected");

            // When the WebSocket connection is closed, set for this function to happen
            socket.onclose = () => console.log("WebSocket disconnected");

            // When a message is received from the WebSocket server
            socket.onmessage = (event) => {
                const result = event.data;
                console.log("Server response" + result);
                // If the server indicates to scroll up
                if (result === "4") {
                    window.scrollBy(0, -100); // Scroll the window up by 10 pixels
                }
                // If the server indicates to scroll down
                else if (result === "5") {
                    window.scrollBy(0, 100); // Scroll the window down by 10 pixels
                }
            };

            // Store the WebSocket instance in the state
            setWs(socket);
        };

        // Function to start capturing video from the user's webcam
        const startVideo = async () => {
            try {
                // Request access to the user's webcam
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                // Wait for the 'loadedmetadata' event before accessing video dimensions
                videoRef.current.addEventListener("loadedmetadata", () => {
                    console.log("Video metadata loaded!");
                    // Once metadata is loaded, the video dimensions should be available
                });
                // Set the video source to the webcam stream
                videoRef.current.srcObject = stream;
                console.log(videoRef);
            } catch (err) {
                // Log any errors that occur while accessing the webcam
                console.error("Error accessing the camera", err);
            }
        };

        // Start capturing video from the webcam
        startVideo();
        // Initialize the WebSocket connection
        startWebSocket();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    useEffect(() => {
        // Function to capture a frame from the video and send it to the server
        const sendFrameToServer = () => {
            if (videoRef.current && ws && ws.readyState === WebSocket.OPEN) {
                // Create a canvas element to capture the video frame
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");

                console.log(
                    "Video dimensions:",
                    videoRef.current.videoWidth,
                    "x",
                    videoRef.current.videoHeight
                );

                // Set the canvas size to match the video size
                canvas.width = videoRef.current.videoWidth;
                canvas.height = videoRef.current.videoHeight;

                // Draw the current video frame onto the canvas
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                console.log(canvas);
                // Convert the canvas content to a Blob (JPEG image)
                canvas.toBlob((blob) => {
                    // Convert the Blob to an ArrayBuffer and send it via WebSocket
                    blob.arrayBuffer().then((buffer) => {
                        console.log("SENT!");
                        ws.send(buffer);
                    });
                }, "image/jpeg");
            }

            // Schedule the next frame capture

            const delayBeforeSendingFrames = 300; // Have a delay here as well so we aren't spamming the web socket server with frames
            const timeoutId = setTimeout(() => {
                requestAnimationFrame(sendFrameToServer);
            }, delayBeforeSendingFrames);
        };
        // Start capturing and sending frames to the server after a 3-second delay to allow for everything to get set up
        const delayBeforeSendingFrames = 3000;
        const timeoutId = setTimeout(() => {
            requestAnimationFrame(sendFrameToServer);
        }, delayBeforeSendingFrames);

        // Cleanup timeout if the component unmounts
        return () => clearTimeout(timeoutId);
    }, [ws]); // Dependency array ensures this effect runs when the WebSocket instance is set

    // Render the video element
    return (
        <video
            ref={videoRef}
            autoPlay
            style={{ display: "none", width: "100%", height: "auto" }} // Display is none so we don't see ourselves when we cook
        />
    );
};

export default GestureControl;
