package com.bezkoder.spring.datajpa.model;

	import javax.persistence.Column;
	import javax.persistence.Entity;
	import javax.persistence.GeneratedValue;
	import javax.persistence.GenerationType;
	import javax.persistence.Id;
	import javax.persistence.Table;

		@Entity
		@Table(name = "Productos")
		public class Producto {

			@Id
			@GeneratedValue(strategy = GenerationType.AUTO)
			private long id;

			@Column(name = "nombre")
			private String nombre;

			@Column(name = "descripcion")
			private String descripcion;


			public Producto() {

			}

			public Producto(String nombre, String descripcion) {
				this.nombre = nombre;
				this.descripcion = descripcion;
			}

			public long getId() {
				return id;
			}

			public void setId(long id) {
				this.id = id;
			}

			public String getNombre() {
				return nombre;
			}

			public void setNombre(String nombre) {
				this.nombre = nombre;
			}

			public String getDescripcion() {
				return descripcion;
			}

			public void setDescripcion(String descripcion) {
				this.descripcion = descripcion;
			}

			@Override
			public String toString() {
				return "Producto [id=" + id + ", nombre=" + nombre+ ", descripcion=" + descripcion  + "]";
			}


			
			
			
		}
