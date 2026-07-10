const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./models/User');
const Course = require('./models/Course');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/edulms");
    console.log("Database connected for seeding...");

    // 1. Remove old courses
    await Course.deleteMany();
    console.log("Old courses deleted");

    // 2. Clear previous student enrollments to fix the dashboard count bug
    if (mongoose.connection.collections['enrollments']) {
      await mongoose.connection.collections['enrollments'].deleteMany({});
      console.log("Old student enrollments cleared out successfully!");
    }

    // Find instructor or create one
    let instructor = await User.findOne({ role: 'admin' });

    if (!instructor) {
      instructor = await User.create({
        name: "Prof. Sarah Jenkins",
        email: "instructor@edulms.com",
        password: "password123",
        role: "admin"
      });
      console.log("Default instructor created");
    }

    // 15 Course Data Directory Array (Cleaned of External Image Strings)
    const sampleCourses = [
      {
        title: "Full Stack Web Development",
        description: "Learn MERN stack development including MongoDB, Express, React and NodeJS.",
        image: "",
        category: "Programming",
        price: 4999,
        duration: "6 Months",
        level: "Advanced"
      },
      {
        title: "Python Programming Masterclass",
        description: "Complete Python programming course from beginner to advanced concepts.",
        image: "",
        category: "Programming",
        price: 2999,
        duration: "3 Months",
        level: "Beginner"
      },
      {
        title: "Java Programming",
        description: "Learn Java fundamentals, OOP concepts and application development.",
        image: "",
        category: "Programming",
        price: 3499,
        duration: "4 Months",
        level: "Intermediate"
      },
      {
        title: "Database Management System",
        description: "Learn SQL, MongoDB, database design and management.",
        image: "",
        category: "Database",
        price: 2999,
        duration: "3 Months",
        level: "Intermediate"
      },
      {
        title: "Data Structures and Algorithms",
        description: "Master DSA concepts for coding interviews and problem solving.",
        image: "",
        category: "Computer Science",
        price: 3999,
        duration: "5 Months",
        level: "Advanced"
      },
      {
        title: "Artificial Intelligence Basics",
        description: "Introduction to AI concepts, algorithms and real world applications.",
        image: "",
        category: "Artificial Intelligence",
        price: 5999,
        duration: "6 Months",
        level: "Intermediate"
      },
      {
        title: "Machine Learning",
        description: "Learn machine learning algorithms and predictive models.",
        image: "",
        category: "Data Science",
        price: 6999,
        duration: "7 Months",
        level: "Advanced"
      },
      {
        title: "React JS Complete Guide",
        description: "Build modern web applications using React JS.",
        image: "",
        category: "Web Development",
        price: 2499,
        duration: "2 Months",
        level: "Intermediate"
      },
      {
        title: "Node JS Backend Development",
        description: "Learn backend development using Node JS and Express.",
        image: "",
        category: "Web Development",
        price: 2999,
        duration: "3 Months",
        level: "Intermediate"
      },
      {
        title: "UI UX Design Fundamentals",
        description: "Learn user interface and user experience design principles.",
        image: "",
        category: "Design",
        price: 1999,
        duration: "2 Months",
        level: "Beginner"
      },
      {
        title: "Digital Marketing",
        description: "Learn SEO, social media marketing and online advertising.",
        image: "",
        category: "Marketing",
        price: 2499,
        duration: "3 Months",
        level: "Beginner"
      },
      {
        title: "Cloud Computing",
        description: "Learn cloud services, deployment and cloud architecture.",
        image: "",
        category: "Cloud",
        price: 5999,
        duration: "5 Months",
        level: "Advanced"
      },
      {
        title: "Cyber Security Fundamentals",
        description: "Learn network security and ethical hacking basics.",
        image: "",
        category: "Security",
        price: 5500,
        duration: "6 Months",
        level: "Advanced"
      },
      {
        title: "Android App Development",
        description: "Create Android applications using Kotlin.",
        image: "",
        category: "Mobile Development",
        price: 3999,
        duration: "4 Months",
        level: "Intermediate"
      },
      {
        title: "Software Engineering",
        description: "Learn software development lifecycle and methodologies.",
        image: "",
        category: "Engineering",
        price: 3500,
        duration: "4 Months",
        level: "Intermediate"
      }
    ];

    // Convert data array map to validate perfectly with schema requirements
    const courses = sampleCourses.map(course => ({
      title: course.title,
      description: course.description,
      image: course.image,
      category: course.category,
      price: course.price,
      duration: course.duration,
      level: course.level,
      instructor: instructor._id,
      lessons: [
        {
          title: "Introduction",
          content: `Introduction to ${course.title}`
        },
        {
          title: "Advanced Concepts",
          content: `Learn advanced concepts of ${course.title}`
        }
      ]
    }));

    await Course.insertMany(courses);
    console.log("🚀 Course data inserted successfully");

    process.exit(0);
  } catch(error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedData();