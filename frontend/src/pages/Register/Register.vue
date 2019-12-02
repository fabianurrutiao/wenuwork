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
        title="<h3 class='mt-0'>Registra una cuenta</h3>"
        customHeader
      >
        <form class="mt" @submit.prevent="handleRegister">
          <div class="form-group">
            <input
              class="form-control no-border"
              ref="name"
              required
              type="text"
              name="name"
              v-model="user.name"
              placeholder="Nombre"
            />
          </div>
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
            >Registrarme</b-button
          >
        </form>
        <p class="widget-auth-info">
          ¿Ya tienes cuenta? Ingresa!
        </p>
        <router-link class="d-block text-center" to="login"
          >Ingresa a tu cuenta</router-link
        >
      </Widget>
    </b-container>

    <div
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
      v-if="message"
    >
      {{ message }}
    </div>

    <footer class="auth-footer">
      WenuWork &copy; 2019
    </footer>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import User from "../../models/user";
export default {
  name: "RegisterPage",
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  components: { Widget },
  data() {
    return {
      user: new User("", "", ""),
      submitted: false,
      successful: false,
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
    handleRegister() {
      this.message = "";
      this.submitted = true;
      if (this.user.name && this.user.email && this.user.password) {
        this.$store.dispatch("auth/register", this.user).then(
          data => {
            this.$store.dispatch("auth/login", this.user).then(
              () => {
                this.$toasted.success(
                  "Se registro de forma correcta en nuestro sitio.",
                  {
                    duration: 3000
                  }
                );
                this.$router.push("/app/dashboard");
              },
              error => {
                this.loading = false;
                this.$toasted.error("Revise los datos para continuar.", {
                  duration: 3000
                });
              }
            );
          },
          error => {
            this.message = error.message;
            this.successful = false;
            this.$toasted.error("El email ya fue usado para registrarse.", {
              duration: 3000
            });
          }
        );
      } else {
        !this.user.name
          ? this.$toasted.error(
              "Tiene datos incorrectos en su registro, favor verifique su nombre para continuar.",
              { duration: 3000 }
            )
          : !this.user.email
          ? this.$toasted.error(
              "Tiene datos incorrectos en su registro, favor verifique su correo para continuar.",
              { duration: 3000 }
            )
          : !this.user.password
          ? this.$toasted.error(
              "Tiene datos incorrectos en su registro, favor verifique su contraseña para continuar.",
              { duration: 3000 }
            )
          : this.$toasted.error(
              "Tiene datos incorrectos en su registro, favor verifique su nombre, correo y contraseña para continuar.",
              { duration: 3000 }
            );
      }
    }
  }
};
</script>
