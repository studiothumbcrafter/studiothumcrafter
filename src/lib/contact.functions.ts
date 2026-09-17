import { createServerFn } from "@tanstack/react-start";

export const getEmailJSConfig = createServerFn({ method: "GET" }).handler(() => {
  const serviceId = process.env["EMAILJS_SERVICE_ID"];
  const templateId = process.env["EMAILJS_TEMPLATE_ID"];
  const publicKey = process.env["EMAILJS_PUBLIC_KEY"];

  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS is not configured");
  }

  return { serviceId, templateId, publicKey };
});
