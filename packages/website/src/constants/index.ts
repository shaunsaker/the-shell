import { app } from 'config'

import { AnalyticsPrimaryButtonName } from '@/analytics/models'

export const constants = {
  header: {
    button: {
      name: AnalyticsPrimaryButtonName.Header,
      text: 'Book your discovery call',
    },
  },
  hero: {
    title: 'Launch your vision with Cofoundly.',
    highlighted: 'Cofoundly',
    subtitle: app.description,
    heading: 'Free discovery call - Ignite your journey',
    description:
      "Unlock a strategic planning session worth $250 — at no cost. Let's chart the optimal route for your tech venture.",
    button: {
      name: AnalyticsPrimaryButtonName.Hero,
      text: 'Schedule your free strategic session',
    },
    footer: 'Limited spots available - reserve your session now!',
    image: {
      src: '/hero/rocket-spaceship.png',
      alt: 'A 3d illustration of a rocket shuttle',
    },
  },
  painPoints: {
    title: 'Navigate past startup struggles.',
    highlighted: 'struggles',
    sections: [
      {
        title: 'Universe of complexity?',
        description: 'We simplify the tech landscape, so you can focus on steering your business to success.',
        image: {
          src: '/pain-points/planets.png',
          alt: 'A 3d illustration of planets colliding',
        },
      },
      {
        title: 'Lost in space?',
        description:
          'Our team syncs with your mission, ensuring clear communication and a shared vision as we embark on this journey together.',
        image: {
          src: '/pain-points/ufo-abduction.png',
          alt: 'A 3d illustration of a ufo abduction',
        },
      },
      {
        title: 'Resource drain?',
        description:
          'Efficient and targeted, our approach ensures your resources are maximised for impact, not lost in the void.',
        image: {
          src: '/pain-points/falling-meteorite.png',
          alt: 'A 3d illustration of a falling meteorite',
        },
      },
    ],
  },
  features: {
    title: "Unleash your startup's potential",
    highlighted: 'potential',
    subtitle:
      'Transition from concept to market-ready in just 24 hours — a process that typically takes at least 12 weeks. Start your journey with a robust foundation crafted by experts.',
    sections: [
      {
        title: 'Your digital foothold',
        description:
          'Launch with a landing page engineered for engagement and conversion. Designed to captivate and connect with your audience, our mobile-responsive pages ensure a seamless user experience, ready for transactions and optimised for discovery.',
        features: ['Mobile-responsive design', 'Ready for Stripe transactions', 'Optimised for search engines'],
        footer: '*Note: The screenshot serves as a conceptual demo to illustrate potential outcomes.',
        image: {
          src: '/features/landing-page.png',
          alt: 'A screenshot of the landing page',
        },
      },
      {
        title: 'Your operational command center',
        description:
          "Step into your mission control with a web app that embodies efficiency and scalability. Our pre-built platform comes equipped with the core functionalities essential for your startup's growth, designed for high performance and an intuitive user experience.",
        features: [
          'Authentication, account, and billing systems',
          'Team management capabilities',
          'Outstanding performance scores',
          'Refined user experience and interface',
        ],
        footer: '*Note: This foundational app requires customisation to fully realise your unique vision.',
        image: {
          src: '/features/web-app.png',
          alt: 'A screenshot of the web app',
        },
      },
      {
        title: 'Your automated communication array',
        description:
          'Maintain stellar relations with your audience through automated, brand-cohesive emails. From user authentication to account updates, our email systems are designed to keep your users informed and engaged without taxing your focus.',
        features: [
          'Automated user authentication emails',
          'Streamlined account management correspondence',
          'Team updates and notifications',
        ],
        footer:
          "Elevate your startup's communication with a system that's responsive, reliable, and reflective of your brand's identity.",
        image: {
          src: '/features/custom-emails.png',
          alt: 'A screenshot of the transactional emails',
        },
      },
    ],
  },
  socialProof: {
    title: 'Powered by leading technologies',
    highlighted: 'technologies',
    subtitle: 'Build on a foundation trusted by experts worldwide.',
  },
  pricing: {
    title: 'Simple pricing, for everyone.',
    highlighted: 'everyone',
  },
  testimonials: {
    title: 'Loved by businesses worldwide.',
    highlighted: 'worldwide',
    sections: [
      {
        name: 'John Doe',
        title: 'CEO',
        company: 'Company',
        testimonial:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: 'https://gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
      },
      {
        name: 'John Doe 2',
        title: 'CEO',
        company: 'Company',
        testimonial:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: 'https://gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
      },
      {
        name: 'John Doe 3',
        title: 'CEO',
        company: 'Company',
        testimonial:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        image: 'https://gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
      },
    ],
  },
  faqs: {
    title: 'Your questions, answered.',
    highlighted: 'answered',
    subtitle: 'Find quick answers to common queries and get closer to launching your vision.',
    sections: [
      {
        question: "What exactly does a 'technical co-founder as a service' mean?",
        answer:
          'It means providing technical expertise and support akin to what a co-founder would offer, including building the product, guiding technical strategy, and ensuring scalable infrastructure.',
      },
      {
        question: 'How quickly can we get started once we sign up?',
        answer:
          'The process begins immediately after the initial discovery call, with the digital presence ready within 24 hours post-consultation.',
      },
      {
        question: 'Can you handle the full development cycle of a product?',
        answer: 'Absolutely. We manage the entire development cycle from ideation to launch and maintenance.',
      },
      {
        question: 'What kind of support can I expect after the initial setup?',
        answer: 'We offer ongoing support packages including updates, enhancements, and technical maintenance.',
      },
      {
        question: 'Is the starter kit fully customisable?',
        answer:
          'Yes, the starter kit is a flexible foundation that can be customised to your brand and functionality needs.',
      },
      {
        question: 'Are there any hidden costs?',
        answer:
          'We value transparency. All costs for the initial setup are straightforward, and any additional costs will be clearly discussed and agreed upon beforehand.',
      },
      {
        question: 'What if I only need a landing page and not the full app development?',
        answer:
          "We provide flexible solutions tailored to your needs, whether that's just a landing page or full-scale development.",
      },
      {
        question: 'How do you ensure the security and privacy of our data?',
        answer:
          'We adhere to industry best practices, secure coding standards, regular audits, and compliance checks to safeguard your data.',
      },
    ],
  },
  cta: {
    title: "Ready to launch your startup's success?",
    highlighted: 'success',
    description:
      "Take the first step into a broader universe. Schedule your complimentary discovery call today and let's plot the course to make your vision a reality. With expert guidance and a swift 24-hour setup, your startup will be ready to take on the market with confidence. Don't let your ideas stay grounded.",
    button: {
      name: AnalyticsPrimaryButtonName.Cta,
      text: 'Book your free discovery call',
    },
    footer:
      '*Hurry! Only a few slots left for this month. Claim your free session valued at $250 and secure your spot today.',
    image: {
      src: '/cta/rocket-landed-on-moon.png',
      alt: 'A 3d illustration of a rocket landed on the moon',
    },
  },
}
