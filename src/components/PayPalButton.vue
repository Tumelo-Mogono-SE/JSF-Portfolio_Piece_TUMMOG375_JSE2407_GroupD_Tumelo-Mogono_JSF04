<script>
export default {
  props: {
    amount: {
      type: Number,
      required: true,
    },
    onSuccess: {
      type: Function,
      required: true,
    },
    onError: {
      type: Function,
      required: true,
    },
    onCancel: {
      type: Function,
      required: true,
    },
  },
  methods: {
    loadPayPalScript() {
      return new Promise((resolve, reject) => {
        if (document.getElementById('paypal-sdk')) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.id = 'paypal-sdk';
        script.src = 'https://www.paypal.com/sdk/js?client-id=AYdvYtrKmdBSyxRRAP-Xp5dihMSiAXoOaOfEFwWDGamtFdmdLPJpjVvADg-EQBJaPsmox3ZoA9xM8gPO';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    },
    initializePayPal() {
      paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.amount,
              },
            }],
          });
        },
        onApprove: async (data, actions) => {
          const details = await actions.order.capture();
          this.onSuccess(details);
        },
        onError: (err) => {
          this.onError(err);
        },
        onCancel: (data) => {
          this.onCancel(data);
        },
      }).render('#paypal-button-container');
    },
  },
  mounted() {
    this.loadPayPalScript()
      .then(() => {
        this.initializePayPal();
      })
      .catch((err) => {
        console.error('Failed to load PayPal SDK:', err);
      });
  },
};
</script>

<template>
    <div id="paypal-button-container"></div>
</template>