import { toRefs, ref, reactive } from "@vue/runtime-core";

export function fetchDetails(url, options) {
  const data = ref(null);
  const state = reactive({
    error: null,
    loading: false,
  });

  const fetchData = async () => {
    state.loading = true;
    try {
      const res = await fetch(url, options);
      data.value = await res.json();
    } catch (e) {
      state.error = e;
    } finally {
      state.loading = false;
    }
  };

  fetchData();

  return { data, ...toRefs(state) };
}
