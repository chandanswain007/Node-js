import { Contact } from './Contact';

// Manages a list of contacts and provides methods for interaction.
export class ContactManager {
  private contacts: Contact[] = [];
  private nextId: number = 1;

  /**
   * Adds a new contact to the list. [cite: 5, 17]
   * @param contact - The contact data to add (name, email, phone).
   * @returns A confirmation message. [cite: 11]
   */
  addContact(contact: Omit<Contact, 'id'>): string {
    const newContact: Contact = {
      id: this.nextId++,
      ...contact,
    };
    this.contacts.push(newContact);
    return `Contact "${newContact.name}" successfully added.`;
  }

  /**
   * Returns the list of all contacts. [cite: 6, 18]
   * @returns An array of Contact objects.
   */
  viewContacts(): Contact[] {
    return this.contacts;
  }

  /**
   * Modifies an existing contact. [cite: 7, 19]
   * @param id - The ID of the contact to modify.
   * @param updatedContact - An object with the contact properties to update.
   * @returns A success or error message. [cite: 10, 11]
   */
  modifyContact(id: number, updatedContact: Partial<Omit<Contact, 'id'>>): string {
    const contactIndex = this.contacts.findIndex(c => c.id === id);

    if (contactIndex === -1) {
      return `Error: Contact with ID ${id} not found.`; 
    }

    const originalContact = this.contacts[contactIndex];
    this.contacts[contactIndex] = { ...originalContact, ...updatedContact };
    return `Contact with ID ${id} successfully modified.`; 
  }

  /**
   * Deletes a contact from the list. [cite: 8, 20]
   * @param id - The ID of the contact to delete.
   * @returns A success or error message. [cite: 10, 11]
   */
  deleteContact(id: number): string {
    const contactIndex = this.contacts.findIndex(c => c.id === id);

    if (contactIndex === -1) {
      return `Error: Contact with ID ${id} not found.`; 
    }

    const deletedContactName = this.contacts[contactIndex].name;
    this.contacts.splice(contactIndex, 1);
    return `Contact "${deletedContactName}" successfully deleted.`; 
  }
}