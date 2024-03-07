interface Faq {
  question: string;
  answer: string;
}

const faqs : Faq[] = [
    {
      question: "What are the fees for listing on your website?",
      answer: `Our website offers <b>free</b> basic listings for both rentals and properties for sale. We also offer <b>premium</b> listings with additional features for a <b>monthly fee</b>. You can find complete details about our pricing options on our pricing page.`,
    },
    {
      question: "How do I create a listing?",
      answer: `Creating a listing is easy! Simply follow these steps:<br/>
      * Sign up for a free account.<br/>
      * Click "Create Listing".<br/>
      * Choose whether you are listing a property for sale or rent.<br/>
      * Fill out the detailed information form, including property details, description, photographs, and pricing.<br/>
      * Review your listing and click "Publish".`,
    },
    {
      question: "Who will see my listing?",
      answer: `Your listing will be visible to anyone browsing our website. We also <b>promote listings</b> through various online channels, including social media and search engines, to increase their visibility to potential buyers or renters.`,
    },
    {
      question: "How do I manage my listing?",
      answer: `Once your listing is published, you can easily manage it through your <b>account dashboard</b>. You can edit information, add photos, schedule virtual tours, respond to inquiries, and track listing views and contact requests.`,
    },
    {
      question: "How do I contact potential buyers or renters?",
      answer: `Interested individuals can contact you directly through the website by sending messages or requesting contact information (depending on your settings). You can also choose to display your contact information directly on your listing.`,
  },
]
  

export default faqs;