import React, { useEffect } from 'react';

const ManualEmail: React.FC = () => {
  useEffect(() => {
    const sendEmail = async () => {
      // Define the email properties
      const email = {
        to: 'snj1669@autuni.ac.nz',
        from: 'yanniiccyy1669@gmail.com',
        subject: 'Test Email',
        body: 'This is a test email.',
      };

      try {
        // Send the email
        await sendEmailViaClient(email);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    };

    sendEmail();
  }, []);

  const sendEmailViaClient = async (emailData: any) => {
    // Implement the email sending logic here using your preferred email sending service or library.
    // This example assumes a mock implementation for demonstration purposes.

    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate a successful email send
        console.log('Email sent:', emailData);
        resolve();
      }, 2000); // Simulate a 2-second delay
    });
  };

  return (
    <div>
      <h1>Send Email Test</h1>
    </div>
  );
};

export default ManualEmail;
