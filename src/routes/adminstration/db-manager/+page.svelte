<script lang="ts">
    import { db, doc, getDoc, collection, setDoc } from '$lib/firebaseConfig.ts'
    import '$lib/app.sass'
	import { json } from '@sveltejs/kit';
    let adminIDs: { [ID: string]: [name: string] } = {}
    let firebaseTempObj: any = {}
    let firebaseAdminObj: any = {}
    async function getFirebaseData() {
        const docRef = doc(db, "main-db", 'admin-4b392e66de9fd519d0f567117d06b250', 'questionsLibrary', 'qDU6R1HQZjGeTe4D8c4r')
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            firebaseAdminObj = docSnap.data()

            return docSnap.data()
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            return {error: "No such document!"}
        }
    }
    let activeAdminID: string
</script>

<main class="items-center" data-theme="business">
    <div class="card w-11/12 h-5/6 bg-white shadow-xl" data-theme="light">
        <div class="card-body">

            {#await getFirebaseData()}
                <p>...waiting</p>
            {:then data }
                <form class="flex items-end gap-3 w-full" action="" method="post">
                    <h3>أضف تجميعة جديدة</h3>
                    <div class="flex flex-row-reverse justify-evenly w-full">
                        <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
                        <button class="btn btn-primary">تأكيد</button>
                    </div>
                </form>                
                <pre>{JSON.stringify(firebaseAdminObj['admin-4b392e66de9fd519d0f567117d06b250']['collections'], null, 2)}</pre>
            {:catch error}
                <p style="color: red">{error.message}</p>
            {/await}

        </div>

    </div>


    <h1 class="text-3xl font-bold underline">
        Hello world!
    </h1>
    <button class="btn btn-error">Error</button>

</main>

<style lang="sass">

</style>