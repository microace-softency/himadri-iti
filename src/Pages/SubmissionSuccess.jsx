import React from 'react';

function SubmissionSuccess() {
  return (
    <div>
      <div className='w-100 vh-100 d-flex justify-content-center items-center'>
          <div>
            <h1>Form Successfully submitted</h1>
            <p>Thanks for your request we will contact soon.</p>
          </div>
          <img src='/one.png' alt='hehe' className='w-50 p-4'/>
      </div>
    </div>
  );
}

export default SubmissionSuccess;
