import React from "react";
import "../app/styles/globals.css";
import Image from "next/image";

export default function Home() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center pt-40">
                <h1 className="text-6xl font-newsreader p-5">
                    Grow and scale your business with AWS
                </h1>
                <div className="flex items-center">
                    <Image
                        className="mb-2 mr-5"
                        src={`/temp2.png`}
                        width="300"
                        height="600"
                        alt="Logo"
                    />
                    <Image
                        className="mb-2 mr-5"
                        src={`/imagePlaceholder.png`}
                        width="500"
                        height="500"
                        alt="Logo"
                    />
                </div>
            </div>
            <div className="flex flex-col p-40">
                <h1 className="text-4xl font-bold header-text-sub">What we do</h1>
                <p className="m-10">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem totam
                    suscipit molestias! Voluptatibus possimus sunt nemo cupiditate earum,
                    fuga necessitatibus facere excepturi expedita laudantium! Velit rem
                    earum adipisci vitae. Eaque. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Dolorem totam suscipit molestias! Voluptatibus
                    possimus sunt nemo cupiditate earum, fuga necessitatibus facere
                    excepturi expedita laudantium! Velit rem earum adipisci vitae. Eaque.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem totam
                    suscipit molestias! Voluptatibus possimus sunt nemo cupiditate earum,
                    fuga necessitatibus facere excepturi expedita laudantium! Velit rem
                    earum adipisci vitae. Eaque. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Dolorem totam suscipit molestias! Voluptatibus
                    possimus sunt nemo cupiditate earum, fuga necessitatibus facere
                    excepturi expedita laudantium! Velit rem earum adipisci vitae. Eaque.
                </p>
            </div>
        </div>
    );
}
