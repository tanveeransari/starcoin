import React from "react";

const FAQ: React.FC = () => {
  const faqSections = [
    {
      title: "E-MX customs & the ride",
      questions: [
        {
          q: "What is E-MX customs all about?",
          a: "E-MX customs is a rider-first brand built for people who see the road as a lifestyle, not a commute. The gear is designed to feel at home on the bike, at the coffee stop, and everywhere in between.",
        },
        {
          q: "Who is E-MX customs gear made for?",
          a: "E-MX customs is for everyday riders, weekend explorers, and anyone who lives for two wheels and good company. Whether you are new to bikes or a seasoned rider, the focus is comfort, safety, and self-expression.",
        },
        {
          q: "Do you support the riding community?",
          a: "Yes, E-MX customs is inspired by real riders and aims to support local scenes, group rides, and causes that keep motorcycling accessible and inclusive. Collaboration with creators and events is a core part of the brand vision.",
        },
      ],
    },
    {
      title: "Style, fit & protection",
      questions: [
        {
          q: "How does E-MX customs balance style and safety?",
          a: "The gear takes cues from modern streetwear while integrating features riders expect, like abrasion-resistant fabrics and impact protection in key zones. The idea is to look good off the bike without compromising confidence on it.",
        },
        {
          q: "How do I choose the right size?",
          a: "Use the size guide on each product page and measure yourself the way it suggests, focusing on chest, waist, and sleeve for tops and hips and inseam for bottoms. When in doubt between sizes, most riders prefer going slightly up for layering and comfort.",
        },
        {
          q: "Is the protective gear certified?",
          a: "Where indicated, armor and key impact areas are designed to align with widely used motorcycle safety standards such as CE-rated protection. Check each product description for specific details about protection level and included armor.",
        },
      ],
    },
    {
      title: "Orders, shipping & returns",
      questions: [
        {
          q: "How long will my order take to arrive?",
          a: "Most motorcycle apparel retailers process orders within a few business days and deliver within about a week domestically, with longer timelines for international shipping. E-MX customs follows a similar model, and estimated delivery time will be shown at checkout.",
        },
        {
          q: "Do you ship internationally?",
          a: "We can only ship within the continental United States",
        },
        {
          q: "What if my gear doesn't fit?",
          a: "Rider-focused apparel brands typically allow returns or size exchanges within a set window, as long as items are clean, unworn, and tagged. E-MX customs aims to keep this process simple so you can dial in the right fit without stress.",
        },
      ],
    },
    {
      title: "Care, durability & use",
      questions: [
        {
          q: "How do I care for my E-MX customs gear?",
          a: "Most motorcycle apparel performs best when washed gently, using mild detergent, with armor removed and items air-dried rather than machine-dried. Always follow the care instructions on the label to keep materials and protective features in top shape.",
        },
        {
          q: "Can I wear E-MX customs gear off the bike?",
          a: "Yes, the lifestyle angle means the pieces are meant to blend into daily outfits while still being functional on the ride. Think of it as your everyday uniform that just happens to be built for motorcycling.",
        },
        {
          q: "Will the gear handle different seasons?",
          a: "Many riders layer a base tee or thermal under lighter jackets for cooler weather and switch to breathable pieces in the heat, and E-MX customs is designed to work within that layering approach. Look for features like vents or removable liners in specific products where relevant.",
        },
      ],
    },
    {
      title: "Community, collabs & support",
      questions: [
        {
          q: "Do you collaborate with riders and creators?",
          a: "Yes, E-MX customs is open to teaming up with riders, photographers, and content creators who share a love for the culture around bikes. Collabs may include limited drops, rides, or creative projects.",
        },
        {
          q: "How can I stay connected with the brand?",
          a: "Most lifestyle moto brands share ride stories, product drops, and behind-the-scenes content through social media and email newsletters. E-MX customs will use these channels so riders can feel part of the journey, not just customers.",
        },
        {
          q: "How do I get help with an order or product question?",
          a: "Use the contact options on the site to reach the support team with questions about sizing, features, or orders. The goal is to offer advice more like a fellow rider than a call center script.",
        },
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content fade-in-up">
            <h1 className="hero-title">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h1>
            <p className="hero-subtitle">Find answers to common questions about E-MX customs gear, orders, and more.</p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {faqSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="mb-5">
                  <h2 className="section-title mb-4">{section.title}</h2>
                  <div className="accordion" id={`accordion-${sectionIndex}`}>
                    {section.questions.map((faq, qIndex) => {
                      const itemId = `faq-${sectionIndex}-${qIndex}`;
                      return (
                        <div key={qIndex} className="accordion-item mb-3 border rounded shadow-sm">
                          <h3 className="accordion-header" id={`heading-${itemId}`}>
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse-${itemId}`}
                              aria-expanded="false"
                              aria-controls={`collapse-${itemId}`}
                            >
                              <strong>Q: {faq.q}</strong>
                            </button>
                          </h3>
                          <div
                            id={`collapse-${itemId}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`heading-${itemId}`}
                            data-bs-parent={`#accordion-${sectionIndex}`}
                          >
                            <div className="accordion-body">
                              <p className="mb-0">{faq.a}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3 className="mb-3">Still have questions?</h3>
              <p className="text-muted mb-0">Can't find what you're looking for? Reach out to our support team for personalized assistance.</p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <a href="#contact" className="btn btn-primary btn-lg px-4 py-3">
                <i className="fas fa-envelope me-2"></i>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

