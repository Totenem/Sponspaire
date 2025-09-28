"use client";
import React, { useState } from "react";
import { LoginForm } from "@/components/blocks/AuthBlocks/LoginForm";


export default function LoginPage() {

    return (
    <>
        <LoginForm heading="Login To Sponspaire" buttonText="Login" signupText="Don't have an account?" />
    </>
    )
}