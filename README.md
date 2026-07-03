# TaskFlow Lite — Task Manager Web Application

A sleek, premium, and fully responsive Task Manager web application built with **vanilla HTML, CSS, and JavaScript**. Designed to match a modern black-and-gold aesthetic, it provides an intuitive, high-performance user experience without any frameworks or external dependencies.

---

## ✨ Features
- **Modern Black & Gold Aesthetic**: Designed with a sleek dark theme featuring gold accents, subtle gradients, and elegant hover animations.
- **Task Management (CRUD)**: Easily add objectives, mark them as completed, and delete them with immediate visual feedback.
- **Persistent Storage**: Saves your task list to the browser's `localStorage` so your tasks remain safe even after refreshing or closing the browser.
- **Robust Input Validation**: Features custom input constraints (empty task prevention, minimum/maximum character limits) with smooth shake animations for validation warnings.
- **Statistical Analytics**: Real-time counters display your total objectives, remaining objectives, and completed tasks.
- **Interactive Filtering**: Filter your workspace view between **All**, **Active**, and **Completed** tasks dynamically.
- **Bulk Cleanup**: Quickly clear all completed objectives with a single click.
- **Mobile First & Responsive**: Adaptable layouts optimized for both desktop monitors and mobile touchscreens.

---

## 📁 Project Structure

```
taskflow-lite/
├── index.html              # Main application interface
├── app.js                  # Application entry point (ES6 Module coordinator)
├── README.md               # Project documentation
├── styles/
│   ├── main.css            # Core styling (Black & Gold theme)
│   └── utilities.css       # Helper utility classes
└── modules/
    ├── storage.js          # localStorage abstraction layer
    ├── render.js           # DOM rendering functions
    └── validation.js       # Form validation logic
```

---

## 🛠️ Technology Stack & Details
- **Markup**: Semantic HTML5 with proper ARIA attributes to support accessibility tools.
- **Styling**: Vanilla CSS3 using custom properties (design variables), Flexbox, and CSS Grid for layouts. Smooth micro-animations enhance user interaction.
- **Interactions**: Modular Vanilla JS (ES6 Modules) using clean separation of concerns, DOM manipulation, event delegation, and browser API integration.

---

## 🚀 How to Run the Project Locally

### Option 1: Live Server in VS Code (Recommended)
1. Open **VS Code**.
2. Go to **File → Open Folder...** and select the `taskflow-lite` folder.
3. Install the **Live Server** extension (by Ritwick Dey) if you haven't already.
4. Right-click `index.html` in your file tree and select **"Open with Live Server"**.
5. The application will launch automatically in your browser at `http://127.0.0.1:5500`.

### Option 2: Run a Local Node.js Server
If you already have Node.js installed, you can start a simple server from the Command Prompt:
1. Open Command Prompt and navigate to the project directory:
   ```cmd
   cd C:\Users\user\.gemini\antigravity\scratch\taskflow-lite
   ```
2. Start a simple web server using Node:
   ```cmd
   node -e "const http=require('http'),fs=require('fs'),path=require('path');const mime={'html':'text/html','css':'text/css','js':'application/javascript'};http.createServer((req,res)=>{let f=path.join(__dirname,req.url==='/'?'index.html':req.url);if(!fs.existsSync(f))f=path.join(__dirname,'index.html');const ext=path.extname(f).slice(1);res.setHeader('Content-Type',mime[ext]||'text/plain');fs.createReadStream(f).pipe(res);}).listen(3000,()=>console.log('Server running at http://localhost:3000'));"
   ```
3. Open your browser and navigate to `http://localhost:3000`.

---

## 🌐 How to Deploy to Netlify (Drag & Drop)
1. Navigate to [netlify.com](https://www.netlify.com/) and log in or create a free account.
2. In your dashboard, go to the **Sites** tab.
3. Scroll down to the bottom where you see the **"Drag and drop your site folder here"** area.
4. Drag the entire `taskflow-lite` directory from your File Explorer and drop it into the browser window.
5. Within seconds, your site will be live on a custom `.netlify.app` URL!

---

*Crafted by R. Goutham as Task 2 of the SoftNexis Web Development Internship.*
