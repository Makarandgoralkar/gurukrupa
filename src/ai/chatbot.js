export const getBotReply = async (message) => {
  const msg = message.toLowerCase();

  // 👋 GREETING
  if (msg.match(/hi|hello|hey|namaste/)) {
    return "👋 Welcome to Shri Gurukrupa Constructions! How can I help you today?";
  }

  // 🏗️ SERVICES
  if (msg.includes("service") || msg.includes("what do you do")) {
    return `🏢 Our Services:
• RCC Design 🏗️
• Building Construction 🏠
• Architectural Planning 📐
• 2D/3D Elevation 🎨
• Interior Design 🛋️

👉 We handle complete construction from planning to execution.`;
  }

  // 🏗️ RCC
  if (msg.includes("rcc")) {
    return "🏗️ RCC (Reinforced Cement Concrete) ensures strong and durable structure. We provide safe and high-quality RCC design.";
  }

  // 💰 COST / PRICE
  if (msg.match(/price|cost|budget|rate|estimate/)) {
    return `💰 Construction cost depends on:
• Plot size 📏
• Material quality 🧱
• Design type 🏠

👉 Approx: ₹1500 – ₹2500 per sq.ft (varies)

📞 Contact us for exact estimate.`;
  }

  // 📐 PLAN / DESIGN
  if (msg.match(/plan|map|design|drawing|layout/)) {
    return "📐 We provide smart house planning, Vastu-based layouts, and modern architectural designs tailored to your needs.";
  }

  // 🏠 HOUSE / HOME
  if (msg.match(/home|house|building/)) {
    return "🏠 We build modern, durable, and beautiful homes with high-quality materials and expert engineering.";
  }

  // 📍 LOCATION
  if (msg.includes("location") || msg.includes("where")) {
    return "📍 We are based in Maharashtra, India. Visit our Contact page for exact location and directions.";
  }

  // 📞 CONTACT
  if (msg.match(/contact|phone|call|number/)) {
    return `📞 Contact Us:
Phone: +91 8999916870
Email: shrigurukrupac@gmail.com

💬 You can also connect via WhatsApp.`;
  }

  // 🕒 TIME / PROCESS
  if (msg.match(/time|duration|how long/)) {
    return "⏳ Construction time depends on project size. Typically, a house takes 4–12 months.";
  }

  // 🧱 MATERIAL
  if (msg.match(/material|cement|brick|steel/)) {
    return "🧱 We use high-quality materials like premium cement, steel, and bricks to ensure long-lasting construction.";
  }

  // 🛠️ INTERIOR
  if (msg.includes("interior")) {
    return "🛋️ We provide modern interior design services including furniture planning, lighting, and space optimization.";
  }

  // 🏢 COMMERCIAL
  if (msg.includes("commercial") || msg.includes("office")) {
    return "🏢 Yes, we also construct commercial buildings like offices, shops, and complexes.";
  }

  // 🧾 LOAN / FINANCE
  if (msg.includes("loan") || msg.includes("finance")) {
    return "🏦 We can guide you on home loans and financial planning for your construction project.";
  }

  // 🧑‍💼 EXPERIENCE
  if (msg.match(/experience|why choose|trust/)) {
    return "⭐ We are trusted by many happy clients with strong focus on quality, safety, and timely delivery.";
  }

  // ❓ DEFAULT SMART RESPONSE
  return `🤖 I can help you with:
🏗️ Construction
📐 House Plans
💰 Cost Estimation
📞 Contact Info

👉 Please ask your question in detail 😊`;
};