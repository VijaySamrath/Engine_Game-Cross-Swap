import React from 'react';
import Dialog from '../UI/Dialog'; // Import the Dialog component
import CreateNFT from './create-nft'; // Ensure you import the correct component

const CreateNFTPage = ({ openDialog, toggleDialog }) => {
  return (
    <div>
      {/* Render the CreateNFT component inside the Dialog */}
      {openDialog && (
        <Dialog
          open={openDialog}
          onRequestClose={toggleDialog}
          title="Create an Asset"
          // Add any other props or styling you need for the Dialog component
        >
          <CreateNFT />
        </Dialog>
      )}

      {/* Button to toggle the dialog
      <button onClick={toggleDialog}>
        {openDialog ? 'Close' : 'Create a Asset'}
      </button> */}
    </div>
  );
};

export default CreateNFTPage;

// import React, { useState } from 'react';
// import Dialog from '../UI/Dialog'; // Import the Dialog component
// import CreateNFT from './create-nft';

// const CreateNFTPage = ({ showCreateNFT, toggleDialog }) => {
//   //   const [showCreateNFT, setShowCreateNFT] = useState(false);

//   //   const openDialog = () => {
//   //     setShowCreateNFT(true);
//   //   };

//   //   const closeDialog = () => {
//   //     setShowCreateNFT(false);
//   //   };

//   return (
//     <div>
//       {/* <button onClick={openDialog}>Open Dialog</button> */}

//       {showCreateNFT && (
//         <Dialog
//           open={showCreateNFT}
//           onRequestClose={toggleDialog}
//           title="Create an Asset"
//           // Add any other props or styling you need for the Dialog component
//         >
//           {/* Render the CreateNFT component inside the Dialog */}
//           <CreateNFT />
//         </Dialog>
//       )}
//     </div>
//   );
// };

// export default CreateNFTPage;
