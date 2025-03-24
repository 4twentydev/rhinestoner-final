"use client";

import type React from "react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="relative min-h-[calc(100vh-16rem)]">
      <div className="absolute inset-0 bg-black/20 z-10" />
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] opacity-50">
        <Image
          src="/BG.png"
          alt="Background decoration"
          width={1000}
          height={1000}
          className="object-contain"
          priority
        />
      </div>
      <div className="container px-4 py-8 md:py-12">
        <div className="mx-auto max-w-5xl relative z-10">
          <h1 className="font-heading text-3xl font-bold text-center md:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 text-center text-muted-foreground">
            Have questions or want to place a custom order? We'd love to hear
            from you!
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold">
                  Contact Information
                </h2>
                <ul className="mt-4 space-y-4">
                  <li className="flex items-start">
                    <Mail className="mr-3 h-5 w-5 text-primary" />
                    <span>brandon@4twenty.dev</span>
                  </li>
                  <li className="flex items-start">
                    <Phone className="mr-3 h-5 w-5 text-primary" />
                    <span>(720) 331-4865</span>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="mr-3 h-5 w-5 text-primary" />
                    <span>
                      10541 Ross St.
                      <br />
                      Westminister, CO 80021
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold">Follow Us</h2>
                <div className="mt-4 flex space-x-4">
                  <Link
                    href="https://instagram.com"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link
                    href="https://www.facebook.com/profile.php?id=61571848237551"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link
                    href="https://twitter.com"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </Link>
                </div>
                <div className="mt-6">
                  <p className="text-muted-foreground">
                    Also find us on{" "}
                    <Link
                      href="https://etsy.com"
                      className="text-primary underline"
                    >
                      Etsy
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-heading text-2xl font-bold">Get in Touch</h2>
              <p className="mt-2 text-muted-foreground">
                Fill out the form and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
