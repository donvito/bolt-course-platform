export interface Instructor {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  fullBio: string;
  courses: number;
  students: number;
  rating: number;
  reviews: number;
  expertise: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export const instructorsData: Instructor[] = [
  {
    id: "sarah-johnson",
    name: "Dr. Sarah Johnson",
    role: "Web Development Lead",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    bio: "Former Google engineer with over 15 years of experience in web development and software architecture.",
    fullBio: "Dr. Sarah Johnson is a renowned web development expert with a Ph.D. in Computer Science from Stanford University. Before joining LearnHub as a lead instructor, she spent 8 years as a Senior Software Engineer at Google, where she led several high-impact projects. Sarah specializes in modern JavaScript frameworks, responsive design systems, and scalable architecture patterns. She has presented at numerous international conferences including WebSummit and JSConf, and has contributed to several open-source projects that are widely used in the industry today. Her teaching philosophy focuses on practical, hands-on learning that prepares students for real-world development challenges.",
    courses: 12,
    students: 34500,
    rating: 4.9,
    reviews: 1245,
    expertise: [
      "JavaScript & TypeScript",
      "React & Next.js",
      "Node.js",
      "Responsive Web Design",
      "Web Performance Optimization",
      "Web Accessibility"
    ],
    socialLinks: {
      twitter: "https://twitter.com/sarahjohnsondev",
      linkedin: "https://linkedin.com/in/sarahjohnsondev",
      website: "https://sarahjohnson.dev"
    }
  },
  {
    id: "michael-chen",
    name: "Michael Chen",
    role: "Data Science Expert",
    image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    bio: "Leading data scientist who previously worked at Tesla and Amazon, specializing in machine learning algorithms.",
    fullBio: "Michael Chen is an accomplished data scientist with over a decade of experience applying advanced analytics to solve complex business problems. His career spans roles at Tesla, where he developed predictive maintenance algorithms for manufacturing systems, and Amazon, where he worked on recommendation engines that power the shopping experience for millions of users. Michael holds a Master's degree in Statistical Learning from MIT and is certified in several advanced ML frameworks. He's particularly passionate about making complex data science concepts accessible to beginners and has developed a teaching methodology that breaks down difficult concepts into manageable components. Outside of teaching, Michael regularly contributes to data science publications and mentors aspiring data scientists.",
    courses: 8,
    students: 29300,
    rating: 4.8,
    reviews: 985,
    expertise: [
      "Machine Learning",
      "Python for Data Science",
      "Statistical Analysis",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision"
    ],
    socialLinks: {
      twitter: "https://twitter.com/michaelchendata",
      linkedin: "https://linkedin.com/in/michaelchendata",
      website: "https://michaelchen.io"
    }
  },
  {
    id: "olivia-parker",
    name: "Olivia Parker",
    role: "UI/UX Design Instructor",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    bio: "Award-winning designer with expertise in creating user-centered interfaces for major brands worldwide.",
    fullBio: "Olivia Parker is a highly respected UI/UX designer whose work has been recognized with multiple industry awards, including the prestigious Red Dot Design Award. With a background in both graphic design and cognitive psychology, she brings a unique perspective to design education that emphasizes both aesthetics and usability. Prior to teaching, Olivia led design teams at several Fortune 500 companies and design agencies, creating digital experiences for brands like Apple, Nike, and Spotify. Her courses emphasize design thinking methodology and human-centered design principles. Olivia is known for her ability to guide students through the entire design process, from initial research to high-fidelity prototypes and user testing. She regularly speaks at design conferences worldwide and runs a popular YouTube channel about design principles.",
    courses: 10,
    students: 31200,
    rating: 4.9,
    reviews: 1120,
    expertise: [
      "User Interface Design",
      "User Experience Research",
      "Design Systems",
      "Figma & Adobe XD",
      "Interaction Design",
      "Design Psychology"
    ],
    socialLinks: {
      twitter: "https://twitter.com/oliviaparkerdesign",
      linkedin: "https://linkedin.com/in/oliviaparkerdesign",
      website: "https://oliviaparker.design"
    }
  },
  {
    id: "david-wilson",
    name: "David Wilson",
    role: "AI & ML Specialist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    bio: "PhD in Computer Science with 10+ years experience in artificial intelligence and deep learning research.",
    fullBio: "Dr. David Wilson holds a Ph.D. in Computer Science with a specialization in Artificial Intelligence from Carnegie Mellon University. He has over a decade of experience in AI and machine learning research, with a focus on deep reinforcement learning and generative models. David has published numerous papers in top-tier AI conferences like NeurIPS, ICML, and ICLR, and has accumulated over 5,000 citations for his research work. Before joining LearnHub, he was a Principal AI Researcher at DeepMind, where he contributed to groundbreaking projects including AlphaGo. David is passionate about democratizing AI education and making cutting-edge techniques accessible to students at all levels. His teaching style combines theoretical foundations with practical implementations, helping students build a deep understanding of complex AI concepts while developing real-world applications.",
    courses: 7,
    students: 27800,
    rating: 4.7,
    reviews: 875,
    expertise: [
      "Artificial Intelligence",
      "Deep Learning",
      "Neural Networks",
      "Reinforcement Learning",
      "Computer Vision",
      "GPT & LLM Technologies"
    ],
    socialLinks: {
      twitter: "https://twitter.com/davidwilsonai",
      linkedin: "https://linkedin.com/in/davidwilsonai",
      website: "https://davidwilson.ai"
    }
  }
];

// Helper function to get instructor by ID
export function getInstructorById(id: string): Instructor | undefined {
  return instructorsData.find(instructor => instructor.id === id);
}

// Helper function to get instructor by name (for linking from course page)
export function getInstructorByName(name: string): Instructor | undefined {
  return instructorsData.find(instructor => 
    instructor.name.toLowerCase() === name.toLowerCase());
}