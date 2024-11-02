## This Project Has Two Servers(1 python server+1 JS Server)
### To Run Py Server
- Navigate to backend/ml/main.py
- In terminal run `pip install backend/ml/requirements.txt` to install all the dependencies
- Use `python main.py` to run the python server

### To Run JS Server
- Use `npx tsc -b && npm run dev`


### How it works(The High-Level)?
- When ever an orgainsation issues a document, for instance a certificate, the R-CNN model used in EasyOCR will extract all the deatils and returns a string(for this the python server is used). This string will then be sent and stored in blockchain. So, whenever any user wants to check if a given ceritficate is valid or not, they can simply via the blockchain by providing an image of the doc, the EasyOCR will again extract the deatils, and if some details are missing or altered the validation would fail otherwise it will succeed, validating the document.
