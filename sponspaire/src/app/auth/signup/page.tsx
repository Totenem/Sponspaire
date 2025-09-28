"use client";
import React, { useState } from "react";
import { SignupForm } from "@/components/blocks/AuthBlocks/SignupForm";


export default function SignupPage() {
    return (
    <>
        <SignupForm heading="Signup To Sponspaire" buttonText="Signup" signupText="Already have an account?" />
    </>
    )
}