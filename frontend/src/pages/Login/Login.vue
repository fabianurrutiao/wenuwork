<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-gray"></i>
        Fabian App
        <i class="fa fa-circle text-warning"></i>
      </h5>
      <Widget
        class="widget-auth mx-auto"
        title="<h3 class='mt-0'>Ingresa a tu cuenta</h3>"
        customHeader
      >
        <form class="mt" @submit.prevent="handleLogin">
          <div class="form-group">
            <input
              class="form-control no-border"
              ref="email"
              required
              type="email"
              name="email"
              v-model="user.email"
              placeholder="Correo Electronico"
            />
          </div>
          <div class="form-group">
            <input
              class="form-control no-border"
              ref="password"
              required
              type="password"
              name="password"
              placeholder="Contraseña"
              v-model="user.password"
            />
          </div>
          <b-button
            type="submit"
            size="sm"
            class="auth-btn mb-3"
            variant="inverse"
            >Ingresar</b-button
          >
        </form>
        <p class="widget-auth-info">
          No tienes cuenta? Registrate!
        </p>
        <router-link class="d-block text-center" to="register"
          >Crear una Cuenta</router-link
        >
      </Widget>
    </b-container>
    <footer class="auth-footer">
      WenuWork &copy; 2019
    </footer>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import User from "../../models/user";
export default {
  name: "LoginPage",
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  components: { Widget },
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: ""
    };
  },
  mounted() {
    if (this.loggedIn) {
      this.$toasted.success("Usted ya estaba logeado en el sitio.", {
        duration: 3000
      });
      this.$router.push("/app/dashboard");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      if (this.user.email && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$toasted.success("Ingreso correctamente a nuestro sitio.", {
              duration: 3000
            });
            this.$router.push("/app/dashboard");
          },
          error => {
            console.log(error);
            this.loading = false;
            this.$toasted.error("Usuario o contraseña incorrecto.", {
              duration: 3000
            });
          }
        );
      }
    }
  }
};
</script>
