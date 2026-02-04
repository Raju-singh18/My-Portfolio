// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const auth = require('../middleware/auth');
// const router = express.Router();

// // Create uploads directory if it doesn't exist
// const uploadsDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Always upload to general folder first, then move to correct folder in the route handler
//     const generalPath = path.join(uploadsDir, 'general');
//     if (!fs.existsSync(generalPath)) {
//       fs.mkdirSync(generalPath, { recursive: true });
//     }
//     cb(null, generalPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // File filter
// const fileFilter = (req, file, cb) => {
//   const { type } = req.body;
  
//   if (type === 'resume') {
//     // Allow PDF files for resume
//     if (file.mimetype === 'application/pdf') {
//       cb(null, true);
//     } else {
//       cb(new Error('Only PDF files are allowed for resume'), false);
//     }
//   } else {
//     // Allow images for other types
//     if (file.mimetype.startsWith('image/')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed'), false);
//     }
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB limit
//   }
// });

// // Upload single file (admin only)
// router.post('/single', auth, upload.single('file'), (req, res) => {
//   try {
//     console.log('Upload request received:', {
//       file: req.file ? {
//         filename: req.file.filename,
//         originalname: req.file.originalname,
//         size: req.file.size,
//         path: req.file.path,
//         destination: req.file.destination
//       } : null,
//       body: req.body
//     });

//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }
    
//     // Get the type from request body
//     const type = req.body.type || 'general';
//     let targetFolder = 'general';
    
//     switch (type) {
//       case 'project':
//         targetFolder = 'projects';
//         break;
//       case 'blog':
//         targetFolder = 'blog';
//         break;
//       case 'profile':
//         targetFolder = 'profile';
//         break;
//       case 'resume':
//         targetFolder = 'resume';
//         break;
//     }
    
//     // Create target directory if it doesn't exist
//     const targetDir = path.join(__dirname, '../uploads', targetFolder);
//     if (!fs.existsSync(targetDir)) {
//       fs.mkdirSync(targetDir, { recursive: true });
//     }
    
//     // Always move file to correct folder since multer puts everything in general
//     const currentPath = req.file.path;
//     const targetPath = path.join(targetDir, req.file.filename);
    
//     console.log('Moving file from:', currentPath, 'to:', targetPath);
    
//     try {
//       // Move the file to the correct directory
//       fs.renameSync(currentPath, targetPath);
//       console.log('File moved successfully');
//     } catch (moveError) {
//       console.error('Error moving file:', moveError);
//       // If move fails, try copying and then deleting original
//       try {
//         fs.copyFileSync(currentPath, targetPath);
//         fs.unlinkSync(currentPath);
//         console.log('File copied and original deleted');
//       } catch (copyError) {
//         console.error('Error copying file:', copyError);
//         throw new Error('Failed to move file to correct directory');
//       }
//     }
    
//     const fileUrl = `/uploads/${targetFolder}/${req.file.filename}`;
//     const fullUrl = `http://localhost:5000${fileUrl}`;
    
//     console.log('File uploaded successfully:', {
//       filename: req.file.filename,
//       fileUrl,
//       fullUrl,
//       filePath: targetPath,
//       type: type,
//       targetFolder: targetFolder
//     });
    
//     res.json({
//       message: 'File uploaded successfully',
//       filename: req.file.filename,
//       originalName: req.file.originalname,
//       size: req.file.size,
//       url: fileUrl,
//       fullUrl: fullUrl,
//       serverUrl: fullUrl,
//       type: targetFolder
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ message: 'Upload failed', error: error.message });
//   }
// });

// // Upload multiple files (admin only)
// router.post('/multiple', auth, upload.array('files', 5), (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: 'No files uploaded' });
//     }
    
//     const files = req.files.map(file => ({
//       filename: file.filename,
//       originalName: file.originalname,
//       size: file.size,
//       url: `/uploads/${req.body.type || 'general'}/${file.filename}`,
//       fullUrl: `${req.protocol}://${req.get('host')}/uploads/${req.body.type || 'general'}/${file.filename}`
//     }));
    
//     res.json({
//       message: 'Files uploaded successfully',
//       files
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Upload failed', error: error.message });
//   }
// });

// // Delete file (admin only)
// router.delete('/:type/:filename', auth, (req, res) => {
//   try {
//     const { type, filename } = req.params;
//     const filePath = path.join(uploadsDir, type, filename);
    
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//       res.json({ message: 'File deleted successfully' });
//     } else {
//       res.status(404).json({ message: 'File not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'Delete failed', error: error.message });
//   }
// });

// // Error handling middleware
// router.use((error, req, res, next) => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === 'LIMIT_FILE_SIZE') {
//       return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
//     }
//   }
  
//   res.status(400).json({ message: error.message });
// });

// module.exports = router;




const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const auth = require('../middleware/auth');

const router = express.Router();

/* =========================
   Ensure uploads folder
========================= */
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/* =========================
   Multer Storage
========================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const generalPath = path.join(uploadsDir, 'general');
    if (!fs.existsSync(generalPath)) {
      fs.mkdirSync(generalPath, { recursive: true });
    }
    cb(null, generalPath);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${unique}${path.extname(file.originalname)}`);
  }
});

/* =========================
   File Filter (FIXED)
========================= */
const fileFilter = (req, file, cb) => {
  const allowedImages = ['image/jpeg', 'image/png', 'image/webp'];
  const allowedPdf = 'application/pdf';

  if (allowedImages.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.mimetype === allowedPdf) {
    cb(null, true);
  } else {
    cb(new Error('Only image or PDF files are allowed'), false);
  }
};

/* =========================
   Multer Config
========================= */
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

/* =========================
   Upload Single File
========================= */
router.post('/single', auth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const type = req.body.type || 'general';

    let targetFolder = 'general';
    if (type === 'profile') targetFolder = 'profile';
    if (type === 'resume') targetFolder = 'resume';
    if (type === 'project') targetFolder = 'projects';
    if (type === 'blog') targetFolder = 'blog';

    const targetDir = path.join(uploadsDir, targetFolder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const oldPath = req.file.path;
    const newPath = path.join(targetDir, req.file.filename);

    fs.renameSync(oldPath, newPath);

    const fileUrl = `/uploads/${targetFolder}/${req.file.filename}`;
    const fullUrl = `${req.protocol}://${req.get('host')}${fileUrl}`;

    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      url: fileUrl,
      fullUrl,
      serverUrl: fullUrl,
      type: targetFolder
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: error.message });
  }
});

/* =========================
   Delete File
========================= */
router.delete('/:type/:filename', auth, (req, res) => {
  try {
    const filePath = path.join(uploadsDir, req.params.type, req.params.filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }
    fs.unlinkSync(filePath);
    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =========================
   Multer Error Handler
========================= */
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large (max 5MB)' });
    }
  }
  res.status(400).json({ message: error.message });
});

module.exports = router;
