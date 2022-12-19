package com.bezkoder.spring.datajpa.repository;

	import java.util.List;
	import org.springframework.data.jpa.repository.JpaRepository;
	import com.bezkoder.spring.datajpa.model.Producto;

	public interface ProductoRepository extends JpaRepository<Producto, Long> {
		List<Producto> findByNombreContaining(String nombre);
		List<Producto> findByDescripcion(String descripcion);
	}
