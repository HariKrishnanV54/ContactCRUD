const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const editStatus = document.getElementById("editStatus"); 
const tablebody = document.getElementById("tablebody");

// Default initial contacts
const defaultContacts = []

// Store all contacts in memory
let contacts = [];

// Load stored contacts from sessionStorage on startup
if (sessionStorage.getItem("contacts")) {
  contacts = JSON.parse(sessionStorage.getItem("contacts"));
} else {
  contacts = defaultContacts;
  sessionStorage.setItem("contacts", JSON.stringify(contacts));
}
displayContactList();

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameValue = nameInput.value.trim();
  const phoneValue = phoneInput.value.trim();
  const emailValue = emailInput.value.trim();

  if (nameValue && phoneValue && emailValue) {
    const editIndex = editStatus.value;

    if (editIndex === "") {
      // Create 
      contacts.push({
        name: nameValue,
        phone: phoneValue,
        email: emailValue
      });
    } else {
      // Update 
      contacts[Number(editIndex)] = {
        name: nameValue,
        phone: phoneValue,
        email: emailValue
      };
      editStatus.value = "";
    }

    // Save 
    sessionStorage.setItem("contacts", JSON.stringify(contacts));
    displayContactList();
    contactForm.reset();
  } else {
    alert("Please fill the form completely");
  }
});

function displayContactList() {
  tablebody.innerHTML = "";

  contacts.forEach((item, index) => {
    tablebody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.phone}</td>
        <td>${item.email}</td>
        <td>
          <button onclick="viewContact(${index})" class="btn btn-info btn-sm text-white me-1">View</button>
          <button onclick="editContact(${index})" class="btn btn-warning btn-sm me-1">Edit</button>
          <button onclick="deleteContact(${index})" class="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
    `;
  });
}


function viewContact(contactIndex) {
  const contact = contacts[contactIndex];
  alert(`Name: ${contact.name}\nPhone: ${contact.phone}\nEmail: ${contact.email}`);
}

// Edit contact
function editContact(contactIndex) {
  const contact = contacts[contactIndex];
  nameInput.value = contact.name;
  phoneInput.value = contact.phone;
  emailInput.value = contact.email;

  editStatus.value = contactIndex;
}

// Delete contact
function deleteContact(contactIndex) {
  if (confirm("Are you sure you want to delete this data?")) {
    contacts.splice(contactIndex, 1);
    sessionStorage.setItem("contacts", JSON.stringify(contacts));
    displayContactList();

    if (editStatus.value == contactIndex) {
      editStatus.value = "";
      contactForm.reset();
    }
  }
}