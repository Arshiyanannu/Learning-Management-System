const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Course = require('./models/Course');

dotenv.config();

const seedData = async () => {
  try {
    // 1. Establish runtime database connection
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected for seeding data operations...');

    // 2. Wipe existing catalogs to avoid record duplicates
    await Course.deleteMany();
    console.log('Cleared existing courses schema indices...');

    // 3. Find or generate a default instructor account entity link
    let instructor = await User.findOne({ role: 'admin' });
    
    if (!instructor) {
      console.log('No administrator found. Creating placeholder instructor profile...');
      instructor = await User.create({
        name: 'Prof. Sarah Jenkins',
        email: 'instructor@edulms.com',
        password: 'password123', // Will be hashed automatically by userSchema hooks!
        role: 'admin'
      });
    }

    // 4. Declare array map of basic structural mock syllabus modules
    const mockCourses = [
      {
        title: 'Introduction to Java Programming',
        description: 'Master Object-Oriented design, class abstractions, inheritance metrics, dynamic data array structures, and memory heap layouts from scratch.',
        instructor: instructor._id,
        lessons: [
          { title: 'Development Environment Config', content: 'Learn to install the OpenJDK runtime bundle, configure path execution fields, and run your first compiled class.' },
          { title: 'Variables & Data Type Systems', content: 'Deep dive into primitive variable allocations, stack memory assignments, and integer precision limits.' },
          { title: 'Control Flow Frameworks', content: 'Writing conditional matrices using if/else logic statements, switch patterns, and processing while execution loops.' }
        ]
      },
      {
        title: 'MERN Stack Architecture Masterclass',
        description: 'Build enterprise-grade full-stack applications leveraging MongoDB, Express routing modules, React web view rendering, and Node.js environments.',
        instructor: instructor._id,
        lessons: [
          { title: 'Express.js Rest API Architecture', content: 'Configure network routing maps, set up pipeline controllers, and manage system status responses.' },
          { title: 'React Hooks & State Orchestration', content: 'Understanding state reconciliation, tracking dependency vectors using useEffect, and caching metrics.' },
          { title: 'MongoDB Mongoose Document Schemas', content: 'Structuring validation boundaries, setting indexes, and processing populate model referencing.' }
        ]
      }
    ];

    // 5. Commit items directly to MongoDB
    await Course.insertMany(mockCourses);
    console.log('🚀 Course registry mock data injected successfully!');
    
    // Terminate shell execution cleanly
    process.exit(0);
  } catch (error) {
    console.error(`Seeding operation failed: ${error.message}`);
    process.exit(1);
  }
};

seedData();