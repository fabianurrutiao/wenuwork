<template>
  <b-navbar class="header d-print-none">
    <b-nav>
      <b-nav-item>
        <a class="d-md-down-none px-2" href="#" @click="toggleSidebarMethod" id="barsTooltip">
          <i class='la la-bars la-lg' />
        </a>
        <b-tooltip target="barsTooltip" placement="bottom">
          Esconder on/off <br>  <br> 
        </b-tooltip>
        <a class="fs-lg d-lg-none" href="#" @click="switchSidebarMethod">
          <span class="rounded rounded-lg bg-gray text-white d-md-none">
            <i class="la la-bars la-lg" />
          </span>
          <i class="la la-bars la-lg d-sm-down-none ml-4" />
        </a>
      </b-nav-item>
    </b-nav>
    
    <a  class="navbar-brand d-md-none">
      <i class="fa fa-circle text-gray mr-n-sm" />
      <i class="fa fa-circle text-warning" />
      &nbsp;
      Fabian
      &nbsp;
      <i class="fa fa-circle text-warning mr-n-sm" />
      <i class="fa fa-circle text-gray" />
    </a>
    <b-nav class="ml-auto">
      <b-nav-item-dropdown class="settings-dropdown d-sm-down-none" no-caret right>
        <template slot="button-content">
          <span class="avatar thumb-sm float-left mr-2">
            <img class="rounded-circle" src="../../assets/people/user.png" alt="..." />
          </span>
          <span class="small" v-if="currentUser"> {{currentUser.user.name}} </span>
          <span class="small" v-if="!currentUser"> Ingresa Aquí </span>
        </template>
        <b-dropdown-item v-if="currentUser" @click="Fav"><i class="la la-star" /> Mis Favoritos</b-dropdown-item>
        <b-dropdown-item v-if="!currentUser" @click="Login"><i class="la la-user" /> Ingresar</b-dropdown-item>
        <b-dropdown-divider />
        <b-dropdown-item-button v-if="currentUser" @click="logout">
          <i class="la la-sign-out" /> Desconectar
        </b-dropdown-item-button>
        <b-dropdown-item v-if="!currentUser"  @click="Register"><i class="la la-pencil" /> Registrarme</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Notifications from '@/components/Notifications/Notifications';
import axios from "axios";

export default {
  name: 'Header',
  components: { Notifications },
  data(){
    return {
      user: {
        name: ''
      }
    }
  },
  computed: {
    ...mapState('layout', ['sidebarClose', 'sidebarStatic', 'chatNotificationIcon', 'chatNotificationPopover']),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    ...mapActions('layout', ['toggleSidebar', 'switchSidebar', 'changeSidebarActive', 'initApp']),
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    toggleSidebarMethod() {
      if (this.sidebarStatic) {
        this.toggleSidebar();
        this.changeSidebarActive(null);
      } else {
        this.toggleSidebar();
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    Login(){
      this.$router.push('/login');
    },
    Register(){
      this.$router.push('/register');
    },
    Fav(){
      this.$router.push('/app/favoritos');
    },
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
  created() {
    if (window.innerWidth > 576) {
      this.initApp();
    }
  },
};
</script>

<style src="./Header.scss" lang="scss" scoped />
