import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { upload } from './upload.js'

const firebaseConfig = {
	apiKey: "AIzaSyDxxIRwNU3HLLv5lbkS7m4tfX7cZUwexBs",
	authDomain: "fe-upload-9a9ce.firebaseapp.com",
	projectId: "fe-upload-9a9ce",
	storageBucket: "fe-upload-9a9ce.appspot.com",
	messagingSenderId: "993851865492",
	appId: "1:993851865492:web:e7bfe9fccec6a0b6b23781"
}

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp)

upload('#file', {
	multi: true,
	accept: ['.png', '.jpg', '.jpeg', '.gif'],
	onUpload(files, blocks) {
		console.log(files);
		files.forEach((file, index) => {
			const _ref = ref(storage, `images/${file.name}`)
			const task = uploadBytesResumable(_ref, file)

			// uploadBytes(_ref, file).then(snapshot => {
			// 	console.log('Uploaded succesfully!');
			// })

			task.on('state_changed',
				snapshot => {
					const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'
					const block = blocks[index].querySelector('.preview-info-progress')
					block.textContent = percentage
					block.style.width = percentage
				},
				error => {
					console.log(error);
				},
				() => {
					// task.snapshot.ref.getDownloadURL().then(url => {
					// 	console.log('DownloadURL', url);
					// })

					getDownloadURL(ref(storage, `images/${file.name}`))
						.then(url => {
							console.log('DownloadURL', url);
						})
				})
		})
	}
})