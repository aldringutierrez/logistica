package com.bezkoder.spring.datajpa.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

	@Entity
	@Table(name = "Clientes")
	public class Cliente {

		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private long id;

		@Column(name = "nombre")
		private String nombre;

		@Column(name = "direccion")
		private String direccion;

		@Column(name = "email")
		private String email;

		@Column(name = "telefono")
		private Long telefono;


		public Cliente() {

		}

		public Cliente(String nombre, String direccion, String email, Long telefono) {
			this.nombre = nombre;
			this.direccion = direccion;
			this.email = email;
			this.telefono = telefono;
		}

		public long getId() {
			return id;
		}

		@Override
		public String toString() {
			return "Cliente [id=" + id + ", nombre=" + nombre+ ", direccion=" + direccion + ", email=" + email + ", telefono=" + telefono + "]";
		}

		public String getNombre() {
			return nombre;
		}

		public void setNombre(String nombre) {
			this.nombre = nombre;
		}

		public String getDireccion() {
			return direccion;
		}

		public void setDireccion(String direccion) {
			this.direccion = direccion;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public Long getTelefono() {
			return telefono;
		}

		public void setTelefono(Long telefono) {
			this.telefono = telefono;
		}

		public void setId(long id) {
			this.id = id;
		}

		
		
		
	}
