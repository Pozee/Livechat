const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

//If there are 10 messages and a new one get added the oldest one will be deleted.
exports.onMessageCreate = functions.firestore
    .document('messages/{userId}')
    .onCreate((snap, context) => {
        const ref = admin.firestore().collection('messages').orderBy('timestamp');

        ref.onSnapshot(snapshot => {
            i = 0;
            size = snapshot.size;
            sizeToDelete = size - 10;
            console.log('Messages Count: ' + size);

            snapshot.forEach((doc) => {
                if (i < sizeToDelete) {
                    doc.ref.delete().then(() => {
                        console.log("Document deleted successfully");
                    }).catch((error) => {
                        console.log("Error removing document: " + error);
                    });
                }
                i++;
            });
        });
    });

exports.addAdminRole = functions.https.onCall((data, context) => {
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        return {
            message: "Success! user is now a Admin!"
        }
    }).catch(err => {
        return err;
    });
});