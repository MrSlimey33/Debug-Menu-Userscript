// ==UserScript==
// @name         Debug Menu
// @namespace    https://www.youtube.com/@mrslimey33
// @version      1.2.3
// @description  Adds a menu to your screen that is toggled with Alt+O that has a ton of developer tools, debug tools, and other items too, such as games. To run, press any option in the top right drop-down menu and watch the magic happen!
// @match        https://*/*
// @grant        none
// @icon         https://drive.google.com/file/d/1Jb3qMOa0TUFYU_rINABG-ekhhaQtYucU/view?usp=share_link
// ==/UserScript==

(function() {

// Create the dropdown menu
var smenu = document.createElement('select');
smenu.style.position = "fixed";
smenu.style.fontSize = '14px';
smenu.style.padding = '5px';
smenu.style.top = "0";
smenu.style.left = "50%";
smenu.style.transform = "translateX(-50%)";
smenu.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
smenu.style.color = 'green';
smenu.style.fontFamily = "monospace";
smenu.style.fontSize = "12.5px";
smenu.style.zIndex = "9999";
smenu.style.display = 'none';
smenu.style.border = '2px solid transparent' ;

// Define the options with their respective text values
var soptions = [
  { text: 'The Archive', value: 'haha lol you cant click on this imagine bru' },
  { text: 'Notepad', value: '// Create the notepad textarea\n  var notepad = document.createElement("textarea");\n  notepad.style.width = "400px";\n  notepad.style.height = "150px";\n  notepad.style.marginBottom = "10px";\n  notepad.style.resize = "vertical";\n  notepad.style.backgroundColor = "rgba(0, 0, 0, 0.85)";\n  notepad.style.color = "green";\n  notepad.style.fontFamily = "monospace";\n  notepad.style.fontSize = "12.5px";\n  notepad.style.display = "none";\n\n  // Load the saved note from localStorage\n  var savedNote = localStorage.getItem("debugMenuNote");\n  if (savedNote) {\n    notepad.value = savedNote;\n  }\n\n  // Autosave the note whenever it is edited\n  notepad.addEventListener("input", function() {\n    localStorage.setItem("debugMenuNote", notepad.value);\n  });\n\n  // Add the notepad to the menu\n  document.body.appendChild(notepad);' },
];

// Add event listener to copy the selected option's associated text
smenu.addEventListener('change', function(event) {
  var selectedOption = event.target.options[event.target.selectedIndex];
  copyToClipboard(selectedOption.value);
  smenu.selectedIndex = 0; // Set the selected index to 0 (option 1)
});

// Add options to the dropdown menu
soptions.forEach(function(option) {
  var opt = document.createElement('option');
  opt.value = option.value;
  opt.textContent = option.text;
  smenu.appendChild(opt);
});

// Set the initial selected index to 0 (option 1)
smenu.selectedIndex = 0;

// Add the dropdown menu to the document
document.body.appendChild(smenu);

// Helper function to copy text to clipboard
function copyToClipboard(text) {
  var textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('Copied to clipboard!');
}

// Get the container element to display the device information
const deviceInfoContainer = document.createElement("div");
deviceInfoContainer.style.position = "fixed";
deviceInfoContainer.style.bottom = "0";
deviceInfoContainer.style.right = "0";
deviceInfoContainer.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
deviceInfoContainer.style.padding = "5px";
deviceInfoContainer.style.color = "green";
deviceInfoContainer.style.fontFamily = "monospace";
deviceInfoContainer.style.fontSize = "12.5px";
deviceInfoContainer.style.lineHeight = "1.5";
deviceInfoContainer.style.zIndex = "9999";
deviceInfoContainer.style.whiteSpace = "pre-wrap";
deviceInfoContainer.style.display = 'none';


// Helper function to format battery level to a percentage
function formatBatteryLevel(level) {
  return (level * 100).toFixed(0) + "%";
}

// Update the device information every second
setInterval(() => {
  const { battery, deviceMemory } = navigator;
  const { make, model, width, height } = screen;
  const { length: tabsCount } = window.top.document.querySelectorAll("iframe");
  const { pageXOffset, pageYOffset } = window;
  const tabTitle = document.title;
  const batteryLevel = battery ? formatBatteryLevel(battery.level) : "N/A";
  const deviceInfo =
    `Screen Resolution: ${width} x ${height}\n
Device Memory: ${deviceMemory} GB\n
Tabs Open: ${tabsCount}\n
Current Tab: ${tabTitle}\n`;
  deviceInfoContainer.textContent = deviceInfo;
}, 100);

// Add the device information block to the page
document.body.appendChild(deviceInfoContainer);


// Create a container for the performance metrics
const performanceContainer = document.createElement("div");
performanceContainer.style.position = "fixed";
performanceContainer.style.bottom = "0";
performanceContainer.style.left = "0";
performanceContainer.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
performanceContainer.style.padding = "10px";
performanceContainer.style.color = "green";
performanceContainer.style.fontFamily = "monospace";
performanceContainer.style.fontSize = "14px";
performanceContainer.style.lineHeight = "1.5";
performanceContainer.style.zIndex = "9999";
performanceContainer.style.whiteSpace = "pre-wrap";
performanceContainer.style.display = 'none';

// Update the performance metrics every 0.1 seconds
setInterval(() => {
  const { totalJSHeapSize, usedJSHeapSize } = window.performance.memory;
  const memoryUsage = formatBytes(usedJSHeapSize) + " / " + formatBytes(totalJSHeapSize);
  const fps = (1 / performance.now() * 1000000).toFixed(0);
  const network = performance.getEntriesByType('navigation')[0].transferSize;
  const performanceMetrics =
        `FPS: ${fps}\n
Memory Usage: ${memoryUsage}\n
Network: ${network} bytes transferred\n`;
  performanceContainer.textContent = performanceMetrics;
}, 100);

// Add the performance metrics container to the page
document.body.appendChild(performanceContainer);


// Get the container element to display the System Information
const systemInfoContainer = document.createElement("div");
systemInfoContainer.style.position = "fixed";
systemInfoContainer.style.top = "0";
systemInfoContainer.style.left = "0";
systemInfoContainer.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
systemInfoContainer.style.padding = "10px";
systemInfoContainer.style.color = "green";
systemInfoContainer.style.fontFamily = "monospace";
systemInfoContainer.style.fontSize = "12.5px";
systemInfoContainer.style.lineHeight = "1.5";
systemInfoContainer.style.zIndex = "9999";
systemInfoContainer.style.zIndex = "9999";
systemInfoContainer.style.maxWidth = "30%";
systemInfoContainer.style.whiteSpace = "pre-wrap";
systemInfoContainer.style.display = 'none';



// Helper function to format bytes to a human-readable string
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// Update the System Information every 0.1 seconds
setInterval(() => {
  const { platform, hardwareConcurrency, deviceMemory, userAgent } = navigator;
  const { language, languages, onLine } = window.navigator;
  const { innerWidth, innerHeight } = window;
  const { totalJSHeapSize, usedJSHeapSize } = window.performance.memory;
  const memoryUsage = formatBytes(usedJSHeapSize) + " / " + formatBytes(totalJSHeapSize);
const systemInfo =
      `Platform: ${platform}\n
CPU Cores: ${hardwareConcurrency}\n
Language: ${language}\n
Languages: ${languages}\n
Online: ${onLine}\n
Screen Size: ${innerWidth} x ${innerHeight}\n`;
  systemInfoContainer.textContent = systemInfo;
}, 100);

// Add the System Information block to the page
document.body.appendChild(systemInfoContainer);


// Create the dropdown menu
var menu=document.createElement("div");
menu.style="position:fixed;top:0;right:0;padding:0px;background-color:transparent;z-index:9999;border-top-right-radius:10px;";

// Toggle select element visibility on Alt+O key press
document.addEventListener("keydown", function(event) {
  if (event.altKey && event.code === "KeyO") {
    select.style.display = select.style.display === "none" ? "block" : "none";
    systemInfoContainer.style.display = systemInfoContainer.style.display === "none" ? "block" : "none";
    performanceContainer.style.display = performanceContainer.style.display === "none" ? "block" : "none";
    deviceInfoContainer.style.display = deviceInfoContainer.style.display === "none" ? "block" : "none";
    smenu.style.display = smenu.style.display === "none" ? "block" : "none";
  }
});

  // Disable select element scrollbar
var style = document.createElement("style");
style.innerHTML = "select::-webkit-scrollbar {display:none;}";
document.head.appendChild(style);

// Create the select element
var select = document.createElement('select');
select.style.fontSize = '14px';
select.style.padding = '5px';
select.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
select.style.color = "green";
select.style.border = '2px solid transparent' ;
select.style.display = 'none';
select.style.fontFamily = "monospace";

// Add the select element to the DOM
document.body.appendChild(select);

  // Add options to the select element
  var options = [
      {text: "Debug Menu", bold: true, onclick: function(){}},
      {text: "Set Brightness", onclick: function(){javascript:(function() {var brightnessValue = prompt("Enter brightness value (0-100):");if (brightnessValue !== null) {var body = document.querySelector("body");body.style.filter = "brightness(" + brightnessValue / 100 + ")";}})();}},
      {text: "Asteroids", onclick: function(){javascript:var KICKASSVERSION='2.0';var s = document.createElement('script');s.type='text/javascript';document.body.appendChild(s);s.src='//hi.kickassapp.com/kickass.js';void(0);}},
      {text: "Inspect", onclick: function(){javascript:(function () {var script =document.createElement('script');script.src="//cdn.jsdelivr.net/npm/eruda";document.body.appendChild(script);script.onload = function () {eruda.init()} })();}},
      {text: "Make Editable", onclick: function(){document.designMode="on";}},
      {text: "Stop Editable", onclick: function(){document.designMode="off";}},
      {text: "Delete Element", onclick: function(){var element=prompt("Enter selector of element to delete:");document.querySelector(element).remove();}},
      {text: "Set Background Color", onclick: function(){var color=prompt("Enter background color:");document.body.style.backgroundColor=color;}},
      {text: "Set Text Color", onclick: function(){var color=prompt("Enter text color:");document.body.style.color=color;}},
      {text: "Set Font Size", onclick: function(){var size=prompt("Enter font size:");document.body.style.fontSize=size;}},
      {text: "Set Font Family", onclick: function(){var family=prompt("Enter font family:");document.body.style.fontFamily=family;}},
      {text: "Set Line Height", onclick: function(){var height=prompt("Enter line height:");document.body.style.lineHeight=height;}},
      {text: "Set Margin", onclick: function(){var margin=prompt("Enter margin amount:");document.body.style.margin=margin;}},
      {text: "Set Border", onclick: function(){var width=prompt("Enter border width:");var style=prompt("Enter border style:");var color=prompt("Enter border color:");document.body.style.border=width+" "+style+" "+color;}},
      {text: "Clear Border", onclick: function(){document.body.style.border="none";}},
      {text: "Set Width", onclick: function(){var width=prompt("Enter width:");document.body.style.width=width;}},
      {text: "Set Height", onclick: function(){var height=prompt("Enter height:");document.body.style.height=height;}},
      {text: "Set Opacity", onclick: function(){var opacity=prompt("Enter opacity (0-1):");document.body.style.opacity=opacity;}},
      {text: "Reset All Styles", onclick: function(){document.body.style=""; document.querySelectorAll("*").forEach(function(e){ e.style=""; });}},
      {text: "Validate HTML", onclick: function(){window.open("https://validator.w3.org/nu/?doc="+encodeURIComponent(location.href),'_blank');}},
      {text: "Beautify HTML", onclick: function(){var html=document.getElementsByTagName('html')[0].outerHTML;document.body.innerText=html;}},
      {text: "Show Page Source", onclick: function(){window.open("view-source:"+location.href,'_blank');}},
      {text: "Reload Page", onclick: function(){location.reload();}},
  ];

  options.forEach(function(option){
    var button = document.createElement("button");
    button.innerHTML = option.text;
    button.addEventListener("click", option.onclick);
    var opt = document.createElement("option");
    opt.appendChild(button);
    select.appendChild(opt);
  });

// Create the "Run" button
var runButton = document.createElement("button");
runButton.innerHTML = "Execute";
runButton.style = "margin-left: 10px; font-size: 14px; padding: 5px; background-color:black; color:green;";

// Hide the "Run" button
runButton.style.display = "none";

// Add event listener to copy the selected option's associated text
select.addEventListener('change', function(event) {
  var index = select.selectedIndex;
  options[index].onclick();
  select.selectedIndex = 0; // Set the selected index to 0 (Debug Menu)
});

// Add the select and run buttons to the menu
menu.appendChild(select);
menu.appendChild(runButton);

// Add the menu to the document
document.body.appendChild(menu);

options.forEach(function(option){
  var button = document.createElement("button");
  button.innerHTML = option.text;
  if (option.bold) {
    button.style.fontWeight = "bold";
  }
  button.addEventListener("click", option.onclick);
  var opt = document.createElement("option");
  opt.appendChild(button);
  select.appendChild(opt);
});

})();
