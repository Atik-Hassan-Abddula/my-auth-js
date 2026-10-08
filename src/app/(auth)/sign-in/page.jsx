"use client";

import React, { useState } from "react";

import { Eye, EyeSlash } from "@gravity-ui/icons";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";

import { signIn } from "@/lib/auth-client";

const SignIn = () => {
  // Password show / hide state
  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = Object.fromEntries(formData.entries());

    console.log("form data:", data);

    const { data: resData, error } = await signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    });

    console.log("response:", resData);
    console.log("error:", error);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-[320px]">

        <h1 className="mb-6 text-2xl font-bold">
          Please Sign In
        </h1>

        <Form
          className="flex w-full flex-col gap-4"
          onSubmit={onSubmit}
        >

          {/* ================= EMAIL ================= */}

          <TextField
            className="w-full max-w-[280px]"
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  value
                )
              ) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label>Email</Label>

            <Input
              placeholder="john@example.com"
              className="w-full"
            />

            <FieldError />
          </TextField>

          {/* ================= PASSWORD ================= */}

          <TextField
            className="w-full max-w-[280px]"
            isRequired
            name="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }

              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }

              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label>Password</Label>

            <InputGroup className="w-full max-w-[280px]">

              <Input
                name="password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
              />

              <InputGroup.Suffix>

                <Button
                  isIconOnly
                  type="button"
                  size="sm"
                  variant="ghost"
                  aria-label={
                    isVisible
                      ? "Hide password"
                      : "Show password"
                  }
                  onPress={() =>
                    setIsVisible(!isVisible)
                  }
                >
                  {isVisible ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeSlash className="size-4" />
                  )}
                </Button>

              </InputGroup.Suffix>

            </InputGroup>

            <Description>
              Must be at least 8 characters with 1 uppercase and 1
              number
            </Description>

            <FieldError />

          </TextField>

          {/* ================= BUTTONS ================= */}

          <div className="flex gap-2">

            <Button type="submit">
              Submit
            </Button>

            <Button
              type="reset"
              variant="secondary"
            >
              Reset
            </Button>

          </div>

        </Form>
      </div>
    </div>
  );
};

export default SignIn;