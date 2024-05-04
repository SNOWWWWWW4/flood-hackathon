'use client'
import ModelComponent from "@/components/ModelComponent";
import { Box, Fab, IconButton, Menu } from "@mui/material";
import Image from "next/image";
import react, { useState } from "react";

export default function Home() {
  return (
    <main className='min-h-screen flex items-center bg-slate-600'>
      <div>
        <p>
          hello
        </p>
        <ModelComponent/>
        
        </div>
    </main>
  );
}
