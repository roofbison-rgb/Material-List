// === PART 1 ===
// Manufacturer → color options
const colors = {
  "Atlas": [
    "Burnt Sienna",
    "Dove Gray",
    "Hearthstone Gray",
    "Pewter"
  ],

  "OC-3": [
    "Brownwood",
    "Chateau Green",
    "Colonial Slate",
    "Desert Rose",
    "Driftwood",
    "Estate Gray",
    "Midnight Plum",
    "Onyx Black",
    "Peppercorn",
    "Sand Castle",
    "Sierra Gray",
    "Slatestone Gray",
    "Teak",
    "Terra Cotta",
    "Williamsburg Gray"
  ],

  "OC-4": [
    "Brownwood",
    "Driftwood",
    "Estate Gray",
    "Onyx Black",
    "Teak",
    "Black Sable",
    "Sand Dune",
    "Storm Cloud",
    "Summer Harvest"
  ],

  "Malarkey": [
    "Antique Brown",
    "Black Oak",
    "Brilliant Black",
    "Heather",
    "Natural Wood",
    "Silverwood",
    "Sienna Blend",
    "Storm Gray",
    "Weathered Wood Plus"
  ],

  "Malarkey Legacy": [
    "Antique Brown",
    "Black Oak",
    "Heather",
    "Natural Wood",
    "Silverwood",
    "Storm Gray",
    "Weathered Wood Plus"
  ],

  "Malarkey Vista": [
    "Brilliant Black",
    "Heather",
    "Silverwood",
    "Storm Gray",
    "Weathered Wood Plus"
  ],

  "Tamko": [
    "Black Walnut",
    "Natural Timber",
    "Olde English Pewter",
    "Oxford Gray",
    "Rustic Black",
    "Rustic Slate",
    "Thunderstorm Gray",
    "Weathered Wood"
  ]
};

// Update color dropdown when manufacturer changes
function updateColors() {
  const manu = document.getElementById("manufacturer").value;
  const colorSelect = document.getElementById("color");
  colorSelect.innerHTML = '<option value="">-- Select Color --</option>';
  if (colors[manu]) {
    colors[manu].forEach(c => {
      let opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      colorSelect.appendChild(opt);
    });
  }
  updateResults();
}
// === PART 2 ===
// Show thickness dropdown only if plywood or osb is selected
function updateThicknessVisibility() {
  const material = document.getElementById("deckingMaterial").value;
  const thicknessWrapper = document.getElementById("thicknessWrapper");
  if (material === "plywood" || material === "osb") {
    thicknessWrapper.style.display = "block";
  } else {
    thicknessWrapper.style.display = "none";
    document.getElementById("deckingThickness").value = ""; // reset
  }
  updateResults();
}

// Show "How many more?" input if box vents more is checked
function updateBoxventsMoreVisibility() {
  const moreNeeded = document.getElementById("boxventsMore").checked;
  const wrapper = document.getElementById("boxventsMoreWrapper");
  if (moreNeeded) {
    wrapper.style.display = "inline";
  } else {
    wrapper.style.display = "none";
    document.getElementById("boxventsMoreQty").value = ""; // reset
  }
  updateResults();
}
// === PART 3 ===
// Update materials automatically when inputs change
function updateResults() {
  // Inputs
  const area = parseFloat(document.getElementById("area").value) || 0;
  const eave = parseFloat(document.getElementById("eave").value) || 0;
  const hipridgeLength = parseFloat(document.getElementById("hipridgeLength").value) || 0;
  const valleys = parseFloat(document.getElementById("valleys").value) || 0;
  const soffitWidth = parseFloat(document.getElementById("soffitWidth").value) || 0;
  const ridgeVentLength = parseFloat(document.getElementById("ridgeVentLength").value) || 0;
  const wastePercent = parseFloat(document.getElementById("wastePercent").value) || 0;
  const wasteFactor = 1 + (wastePercent / 100);

  const flatRoofSquares =
  parseFloat(document.getElementById("flatRoofSquares").value) || 0;
// Redecking (no waste)
let redeckSheets = 0;
const deckingMaterial = document.getElementById("deckingMaterial").value;
if (deckingMaterial === "plywood" || deckingMaterial === "osb") {
  // Back out the waste factor to get the raw area
  const effectiveArea = area / wasteFactor;
  redeckSheets = Math.ceil(effectiveArea / 32); // each sheet = 32 sq ft
}

// Redecking output
if (redeckSheets > 0) {
  document.getElementById("redecking").textContent =
    "Redecking (" + deckingMaterial + " sheets, no waste): " + redeckSheets;
} else {
  document.getElementById("redecking").textContent = "Redecking: Not applicable";
}

  // Step & Wall flashing
  const stepFlashingLength = parseFloat(document.getElementById("stepFlashingLength").value) || 0;
  const wallFlashingLength = parseFloat(document.getElementById("wallFlashingLength").value) || 0;
  const stepFlashingPacks = stepFlashingLength / 50;
  const wallFlashingPieces = wallFlashingLength / 10;

  // Manual inputs
  const dripedgeQty = parseInt(document.getElementById("dripedgeQty").value) || 0;
  const gutterapronQty = parseInt(document.getElementById("gutterapronQty").value) || 0;
  const boxventsQty = parseInt(document.getElementById("boxventsQty").value) || 0;
  const boxventsMore = document.getElementById("boxventsMore").checked;
  const boxventsMoreQty = parseInt(document.getElementById("boxventsMoreQty").value) || 0;
  const pipebootsQty = parseInt(document.getElementById("pipebootsQty").value) || 0;

  // Coverage
  const shingles = (area / 32.8) * wasteFactor;
  const hipRidgeBundles = (hipridgeLength / 33) * wasteFactor;
  const eavesOnly = parseFloat(document.getElementById("eavesOnly").value) || 0;

let iceWaterRows = 1;

// If soffit width was measured
if (!document.getElementById("soffitNotMeasured").checked) {
  if (soffitWidth > 12) {
    iceWaterRows = 2;
  }
}

// Eaves + valleys
const iceWaterCoverage =
  (eavesOnly * iceWaterRows) + valleys;

const iceWaterRolls = iceWaterCoverage / 65;
  const underlaymentRolls = area / 1000;
  const ridgeVentPieces = ridgeVentLength / 20;
  const valleyMetalRolls = (valleys / 50) * wasteFactor;

  const roofSquares = area / 100;

const nailBoxes = roofSquares / 15;
const stapleBoxes = roofSquares / 20;

  const manu = document.getElementById("manufacturer").value;
  const starterCoverage = (manu === "Atlas") ? 140 : 105;
  const starterStripBundles = (eave / starterCoverage) * wasteFactor;

  const color = document.getElementById("color").value;
  const brandInfo = manu ? " (" + manu + (color ? " - " + color : "") + ")" : "";

  // DOM updates
  document.getElementById("starterstrip").textContent =
    "Starter Strip (bundles): " + Math.ceil(starterStripBundles);
  document.getElementById("shingles").textContent =
    "Shingles (bundles): " + Math.ceil(shingles) + brandInfo;
  document.getElementById("hipridge").textContent =
    "Hip & Ridge (bundles): " + Math.ceil(hipRidgeBundles) + brandInfo;
  document.getElementById("valleymetal").textContent =
    "Valley Metal (rolls): " + Math.ceil(valleyMetalRolls);
  document.getElementById("icewater").textContent =
    "Ice & Water (rolls): " + Math.ceil(iceWaterRolls) +
    " (" + iceWaterRows + " row" + (iceWaterRows > 1 ? "s" : "") + ")";
  document.getElementById("underlayment").textContent =
    "Underlayment (rolls): " + Math.ceil(underlaymentRolls);

  document.getElementById("nails").textContent =
    "Nails (boxes): " + Math.ceil(nailBoxes);
  
  document.getElementById("staples").textContent =
    "Staples (boxes): " + Math.ceil(stapleBoxes);  
  document.getElementById("dripedge").textContent =
    "Drip Edge (pieces): " + dripedgeQty;
  document.getElementById("gutterapron").textContent =
    "Gutter Apron (pieces): " + gutterapronQty;

  document.getElementById("stepflashing").textContent =
    "Step Flashing (packs): " + Math.ceil(stepFlashingPacks);
  document.getElementById("wallflashing").textContent =
    "Wall Flashing (pieces): " + Math.ceil(wallFlashingPieces);

  if (boxventsQty > 0) {
    document.getElementById("ridgevent").textContent = "Ridge Vent: N/A (using box vents)";
  } else {
    document.getElementById("ridgevent").textContent =
      "Ridge Vent (pieces): " + Math.ceil(ridgeVentPieces);
  }

  const boxventColor =
  document.getElementById("boxventColor").value;

let boxventText = "Box Vents: " + boxventsQty;

if (boxventColor) {
  boxventText += " (" + boxventColor + ")";
}

if (boxventsMore && boxventsMoreQty > 0) {
  boxventText += " (+" + boxventsMoreQty + " more needed)";
} else if (boxventsMore) {
  boxventText += " (More needed!)";

  }
  document.getElementById("boxventsResult").textContent = boxventText;

  document.getElementById("pipebootsResult").textContent =
    "Pipe Boots: " + pipebootsQty;

  let deckingText = "Decking: ";
  if (deckingMaterial) {
    deckingText += deckingMaterial;
    const deckingThickness = document.getElementById("deckingThickness").value;
    if (deckingThickness) deckingText += " " + deckingThickness + "\"";
  } else {
    deckingText += "Not selected";
  }
  document.getElementById("decking").textContent = deckingText;

  if (redeckSheets > 0) {
    document.getElementById("redecking").textContent =
      "Redecking (" + deckingMaterial + " sheets, no waste): " + redeckSheets;
  } else {
    document.getElementById("redecking").textContent = "Redecking: Not applicable";
  }
//flat roof
if (flatRoofSquares > 0) {
  document.getElementById("flatroofResult").textContent =
    "Flat Roof Area: " +
    flatRoofSquares +
    " squares";
} else {
  document.getElementById("flatroofResult").textContent =
    "Flat Roof: None";
}
  // Address + Title update
  const address = document.getElementById("addressInput").value;
  document.getElementById("addressDisplay").textContent = address ? address : "";

  const jobno = document.getElementById("jobno").value;
  const clientName = document.getElementById("clientName").value;
  if (clientName && address) {
    document.title = "BR-" + jobno + " - " + clientName + " - " + address;
  } else if (clientName) {
    document.title = clientName;
  } else if (address) {
    document.title = address;
  } else {
    document.title = "Roofing Checklist";
  }
}
// === PART 4 ===
// Event listeners
["pitch","area","eave","eavesOnly","hipridgeLength","valleys","flatRoofSquares","soffitWidth","wastePercent","ridgeVentLength",
 "stepFlashingLength","wallFlashingLength"].forEach(id => {
  document.getElementById(id).addEventListener("input", updateResults);
});

document.getElementById("jobno").addEventListener("input", updateResults);
document.getElementById("manufacturer").addEventListener("change", updateColors);
document.getElementById("color").addEventListener("change", updateResults);

document.getElementById("boxventsQty").addEventListener("input", updateResults);
document.getElementById("boxventColor")
  .addEventListener("change", updateResults);
document.getElementById("boxventsMore").addEventListener("change", updateBoxventsMoreVisibility);
document.getElementById("boxventsMoreQty").addEventListener("input", updateResults);

document.getElementById("pipebootsQty").addEventListener("input", updateResults);
document.getElementById("dripedgeQty").addEventListener("input", updateResults);
document.getElementById("gutterapronQty").addEventListener("input", updateResults);

document.getElementById("deckingMaterial").addEventListener("change", updateThicknessVisibility);
document.getElementById("deckingThickness").addEventListener("change", updateResults);

document.getElementById("addressInput").addEventListener("input", updateResults);
document.getElementById("clientName").addEventListener("input", updateResults);
document.getElementById("stepFlashingLength").addEventListener("input", updateResults);
document.getElementById("wallFlashingLength").addEventListener("input", updateResults);

// Initial setup on load
document.addEventListener("DOMContentLoaded", () => {
  updateThicknessVisibility();
  updateColors();
  updateResults();
});