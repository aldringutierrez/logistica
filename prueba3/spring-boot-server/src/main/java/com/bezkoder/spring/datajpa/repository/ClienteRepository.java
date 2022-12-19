package com.bezkoder.spring.datajpa.repository;


	import java.util.List;

	import org.springframework.data.jpa.repository.JpaRepository;

	import com.bezkoder.spring.datajpa.model.Cliente;

	public interface ClienteRepository extends JpaRepository<Cliente, Long> {
		List<Cliente> findByNombreContaining(String nombre);
		List<Cliente> findByEmail(String email);
	}
