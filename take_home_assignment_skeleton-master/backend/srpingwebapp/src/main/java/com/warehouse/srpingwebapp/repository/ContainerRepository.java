package com.warehouse.srpingwebapp.repository;

import com.warehouse.srpingwebapp.entity.container;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ContainerRepository extends JpaRepository<container,Integer> {

//    @Query(value = "select * from container where root_parent_id = :rootParentId order by listnum asc",nativeQuery = true)
//    List<container> findByRootParentId(@Param("rootParentId") Integer rootParentId);

    List<container> findByparentid(Integer parentid);

    List<container> findBytypebool(boolean typebool);

    container findBybarcode(Integer barcode);

    void deleteBybarcode(Integer barcode);

//    @Modifying
//    @Query("")
//    void updateRootandListcontainer(Integer newroot,Integer oldroot,Integer newindex,Integer oldindex);

}

