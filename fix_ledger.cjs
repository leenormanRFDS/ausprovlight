const fs = require('fs');

let code = fs.readFileSync('src/pages/Ledger.tsx', 'utf8');

// The file starts with the instrumentFrame, and then the original code follows.
// Let's find "import React" which should be the start of the original code.
const importIndex = code.indexOf("import React");
if (importIndex > 0) {
  let originalCode = code.substring(importIndex);
  
  // Now originalCode has the code where:
  // 1. Crosshairs were removed
  // 2. Header was removed
  // 3. Custody was removed
  // 4. Footer was removed
  
  // We need to re-insert the instrumentFrame at the correct location.
  // The end of the component should be:
  //      </div>
  //    </div>
  //  );
  //}
  
  // Wait, my previous script also had an issue:
  // The returnMatch was supposed to match the end of the div.
  // Let's find the last occurrence of '    </div>'
  const returnMatch = originalCode.lastIndexOf("    </div>\\n  );\\n}");
  // If returnMatch failed, it's because the indentation or newlines didn't match.
  // Let's use regex to find the end.
  // We want to insert instrumentFrame right before the last closing </div> of the main return.
  
  const instrumentFrameCode = code.substring(0, importIndex);
  
  const finalEndIndex = originalCode.lastIndexOf("</div>");
  if (finalEndIndex !== -1) {
      originalCode = originalCode.substring(0, finalEndIndex) + instrumentFrameCode + originalCode.substring(finalEndIndex);
  }
  
  fs.writeFileSync('src/pages/Ledger.tsx', originalCode);
  console.log("Fixed Ledger.tsx");
} else {
  console.log("Could not find import React");
}
