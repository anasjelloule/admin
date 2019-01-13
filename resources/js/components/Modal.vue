<template>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    role="dialog"
    aria-labelledby="popupTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <slot name="modal-form"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: ["id"]
};
</script>
