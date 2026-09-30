
import {prisma} from "./prisma"

async function main() {

const faqs = [
  {
    question: "What is your refund policy?",
    answer:
      "We offer refunds within 30 days of purchase as long as the product meets our refund requirements.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our customer support team by email or through the contact form on our website.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Standard delivery usually takes between 3 and 7 business days depending on your location.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we offer international shipping to selected countries. Shipping costs and delivery times vary by destination.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Click the 'Forgot Password' link on the login page and follow the instructions sent to your email.",
  },
];
const response = await fetch("/api/api", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    faqs:{
        faqs
    }
  }),
});

const data = await response.json();

console.log(data)

}

main()
  .catch(console.error).finally(async ()=>{
    await prisma.$disconnect()
  })