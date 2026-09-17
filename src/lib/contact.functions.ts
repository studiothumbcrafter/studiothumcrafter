import { createServerFn } from "@tanstack/react-start";

export const sendInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => {
    if (!(data instanceof FormData)) {
      throw new Error("Expected FormData");
    }
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const details = String(data.get("details") || "").trim();
    const requirements = String(data.get("requirements") || "").trim();

    if (!name || !email || !details || !requirements) {
      throw new Error("All fields are required");
    }

    return { name, email, details, requirements };
  })
  .handler(async ({ data }) => {
    const serviceId = process.env["EMAILJS_SERVICE_ID"];
    const templateId = process.env["EMAILJS_TEMPLATE_ID"];
    const publicKey = process.env["EMAILJS_PUBLIC_KEY"];
    const privateKey = process.env["EMAILJS_PRIVATE_KEY"];

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      throw new Error("EmailJS is not configured");
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          name: data.name,
          email: data.email,
          details: data.details,
          requirements: data.requirements,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("EmailJS request failed");
    }

    return { ok: true };
  });
