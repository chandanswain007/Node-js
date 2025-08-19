import { ContactManager } from './ContactManager';

// 1. Initialize the Contact Manager
const contactManager = new ContactManager();
console.log('Contact Manager Initialized.\n');

// 2. Add new contacts [cite: 5]
console.log('--- Adding Contacts ---');
console.log(contactManager.addContact({ name: 'Alice', email: 'alice@example.com', phone: '123-456-7890' }));
console.log(contactManager.addContact({ name: 'Bob', email: 'bob@example.com', phone: '234-567-8901' }));
console.log(contactManager.addContact({ name: 'Charlie', email: 'charlie@example.com', phone: '345-678-9012' }));
console.log('\n');

// 3. View all contacts [cite: 6]
console.log('--- Viewing Contacts ---');
console.log('Current Contacts:', contactManager.viewContacts());
console.log('\n');

// 4. Modify an existing contact [cite: 7]
console.log('--- Modifying a Contact ---');
console.log(contactManager.modifyContact(2, { email: 'bob.new@example.com' }));
console.log('Updated Contacts:', contactManager.viewContacts());
console.log('\n');

// 5. Attempt to modify a non-existent contact [cite: 10]
console.log('--- Modifying a Non-Existent Contact ---');
console.log(contactManager.modifyContact(99, { name: 'Non Existent' }));
console.log('\n');

// 6. Delete a contact [cite: 8]
console.log('--- Deleting a Contact ---');
console.log(contactManager.deleteContact(1));
console.log('Updated Contacts:', contactManager.viewContacts());
console.log('\n');

// 7. Attempt to delete a non-existent contact [cite: 10]
console.log('--- Deleting a Non-Existent Contact ---');
console.log(contactManager.deleteContact(99));
console.log('\n');

console.log('--- Final List of Contacts ---');
console.log(contactManager.viewContacts());