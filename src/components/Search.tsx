import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../app/globals.css'
import { data } from './data';



interface Contact {
  first_name: string;
  // Add other properties if your data items have more fields.
}

function Filter() {
  const [contacts, setContacts] = useState<Contact[]>(data);
  const [search, setSearch] = useState<string>('');

  return (
    <div>
      <Container>
        <h1 className='text-center mt-4'>Conversation Keeper</h1>
        <Form>
          <InputGroup className='my-3'>
            <Form.Control
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder='Search contacts'
            />
          </InputGroup>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Conversation Results</th>
            </tr>
          </thead>
          <tbody>
            {contacts
              .filter((item: Contact) => {
                return search.toLowerCase() === ''
                  ? true
                  : item.first_name.toLowerCase().includes(search.toLowerCase());
              })
              .map((item: Contact, index: number) => (
                <tr key={index} className='custom-row'>
                  <td>{item.first_name}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Filter;
