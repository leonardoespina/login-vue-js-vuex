<script>
import { useStore } from "vuex";

export default {
  /*setup() {
    // store
    const store = useStore();
    const eva=()=>{
    let payload = {
      act: "eli",
      id: "62f7d9f0d7ecdf865376a083",
      endPoint: "users/deleteUser/",
    };

    store.dispatch("action", payload);

  },


   }*/

  setup() {
    const store = useStore();
    const eva = () => {
      let payload = {
        act: "eli",
        id: "62f7d9f0d7ecdf865376a083",
        endPoint: "users/deleteUser/",
      };

      store.dispatch("action", payload);
    };
    return { eva };
  },
};
</script>
