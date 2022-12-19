package com.bezkoder.spring.datajpa.repository;

	import java.util.List;
	import org.springframework.data.jpa.repository.JpaRepository;
	import com.bezkoder.spring.datajpa.model.Envio;

	public interface EnvioRepository extends JpaRepository<Envio, Long> {
		List<Envio> findByClienteId(Long clienteId);
		List<Envio> findByProductoId(Long productoId);
	}

