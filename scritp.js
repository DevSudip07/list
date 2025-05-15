const memberNameInput = document.getElementById("memberName");
const amountInput = document.getElementById("amount");
const saveButton = document.querySelector(".save-btn");
const listContainer = document.querySelector(".listContainer");

let members = JSON.parse(localStorage.getItem("members")) || [];

// Function to render members
// function renderMembers() {
//     // Remove previous list if any
//     const oldList = document.querySelector(".member-list");
//     if (oldList) oldList.remove();

//     const ul = document.createElement("ol");
//     ul.className = "member-list";
//     // ul.style.listStyle = "none";
//     ul.style.padding = "1rem";

//     members.forEach((member, index) => {
//         const li = document.createElement("li");
//         li.style.display = "flex";
//         li.style.justifyContent = "space-between";
//         li.style.alignItems = "center";
//         li.style.marginBottom = "1rem";
//         li.style.background = "#fff2";
//         li.style.padding = "0.7rem 1rem";
//         li.style.borderRadius = "0.5rem";

//         const info = document.createElement("span");
//         info.innerHTML = `<strong>${member.name}</strong>: ₹${member.amount}`;

//         const editBtn = document.createElement("button");
//         editBtn.textContent = "Edit";
//         editBtn.style.background = "orange";
//         editBtn.style.marginLeft = "10px";
//         editBtn.style.padding = "0.3rem 0.7rem";
//         editBtn.style.borderRadius = "0.3rem";

//         editBtn.onclick = () => {
//             const newName = prompt("Edit name:", member.name);
//             const newAmount = prompt("Edit amount:", member.amount);
//             if (newName && newAmount) {
//                 members[index] = { name: newName, amount: parseFloat(newAmount) };
//                 localStorage.setItem("members", JSON.stringify(members));
//                 renderMembers();
//             }
//         };

//         li.appendChild(info);
//         li.appendChild(editBtn);
//         ul.appendChild(li);
//     });

//     listContainer.appendChild(ul);
// }

function renderMembers() {
  const oldList = document.querySelector(".member-list");
  if (oldList) oldList.remove();

  const container = document.createElement("div");
  container.className = "member-list";
  container.style.padding = "1rem";

  members.forEach((member, index) => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.alignItems = "center";
    row.style.gap = "1rem";
    row.style.marginBottom = "0.8rem";
    row.style.background = "#fff2";
    row.style.padding = "0.7rem 1rem";
    row.style.borderRadius = "0.5rem";

    const number = document.createElement("span");
    number.textContent = `${index + 1}.`;
    number.style.width = "30px";
    number.style.fontWeight = "bold";

    const name = document.createElement("span");
    name.textContent = member.name;
    name.style.flex = "1";

    const amount = document.createElement("span");
    amount.textContent = `₹${member.amount}`;
    amount.style.flex = "1";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.background = "orange";
    editBtn.style.padding = "0.3rem 0.7rem";
    editBtn.style.borderRadius = "0.3rem";

    editBtn.onclick = () => {
      const newName = prompt("Edit name:", member.name);
      const newAmount = prompt("Edit amount:", member.amount);
      if (newName && newAmount) {
        members[index] = { name: newName, amount: parseFloat(newAmount) };
        localStorage.setItem("members", JSON.stringify(members));
        renderMembers();
      }
    };

    row.appendChild(number);
    row.appendChild(name);
    row.appendChild(amount);
    row.appendChild(editBtn);
    container.appendChild(row);
  });

  listContainer.appendChild(container);
}





// Handle form submission
saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    const name = memberNameInput.value.trim();
    const amount = amountInput.value.trim();

    if (name === "" || amount === "") return alert("Please fill both fields!");

    members.push({ name, amount: parseFloat(amount) });
    localStorage.setItem("members", JSON.stringify(members));

    memberNameInput.value = "";
    amountInput.value = "";

    renderMembers();
});

// Initial render
renderMembers();


function generateShareLink() {
  const dataString = JSON.stringify(members);
  const encoded = btoa(dataString); // base64 encode
  const url = `${location.origin}${location.pathname}?data=${encoded}`;
  navigator.clipboard.writeText(url)
    .then(() => alert("Share link copied to clipboard!"))
    .catch(() => alert("Failed to copy link"));
}


function loadSharedList() {
  const urlParams = new URLSearchParams(window.location.search);
  const sharedData = urlParams.get("data");
  if (sharedData) {
    try {
      const decoded = atob(sharedData); // base64 decode
      const sharedMembers = JSON.parse(decoded);
      members = sharedMembers;
      renderMembers();
    } catch (e) {
      console.error("Invalid shared data.");
    }
  } else {
    const saved = localStorage.getItem("members");
    if (saved) {
      members = JSON.parse(saved);
      renderMembers();
    }
  }
}


window.onload = loadSharedList;
