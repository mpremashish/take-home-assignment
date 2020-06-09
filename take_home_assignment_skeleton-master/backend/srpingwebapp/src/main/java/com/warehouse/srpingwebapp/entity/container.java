package com.warehouse.srpingwebapp.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Entity
public class container implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer barcode;

    private Integer parentid;


    private String Type;

    private Integer rootParentid;

    private Integer listnum;

    private boolean typebool;

    public boolean isTypebool() {
        return typebool;
    }

    public void setTypebool(boolean typebool) {
        this.typebool = typebool;
    }

    public container() {
        rootParentid=0;
        listnum = 0;
    }

    public Integer getRootParentid() {
        return rootParentid;
    }

    public void setRootParentid(Integer rootParentid) {
        this.rootParentid = rootParentid;
    }

    public Integer getBarcode() {
        return barcode;
    }

    public void setBarcode(Integer barcode) {
        this.barcode = barcode;
    }

    public Integer getParentid() {
        return parentid;
    }

    public void setParentid(Integer parentid) {
        this.parentid = parentid;
    }

    public String getType() {
        return Type;
    }

    public void setType(String type) {
        Type = type;
    }

    public Integer getListnum() {
        return listnum;
    }

    public void setListnum(Integer listnum) {
        this.listnum = listnum;
    }
}
