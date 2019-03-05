package com.cplatform.back.coord2;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.cplatform.back.entity.coord.Coordinate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

public class Test {


    public static boolean isInPolygon(Coordinate checkPoint, List<Coordinate> polygonPoints) {
        int counter = 0;
        BigDecimal xinters;
        Coordinate p1, p2;
        int pointCount = polygonPoints.size();
        p1 = polygonPoints.get(0);

        for (int i = 1; i <= pointCount; i++) {
            p2 = polygonPoints.get(i % pointCount);
            if (
                    checkPoint.getPrecision().compareTo(p1.getPrecision().min(p2.getPrecision())) > 0 &&
                            checkPoint.getPrecision().compareTo(p1.getPrecision().max(p2.getPrecision())) <= 0) {
                if (checkPoint.getLatitude().compareTo(p1.getLatitude().max(p2.getLatitude())) <= 0) {
                    if (p1.getPrecision().compareTo(p2.getPrecision()) != 0) {
                        xinters =
                                (checkPoint.getPrecision().subtract(p1.getPrecision()))
                                        .multiply(p2.getLatitude().subtract(p1.getLatitude()))
                                        .divide(p2.getPrecision().subtract(p1.getPrecision()), 14, RoundingMode.CEILING)
                                        .add(p1.getLatitude());
                        if (p1.getLatitude().compareTo(p2.getLatitude()) == 0 
                                || checkPoint.getLatitude().compareTo(xinters) <= 0) {
                            counter++;
                        }
                    }
                }
            }
            p1 = p2;
        }
        return counter % 2 != 0;
    }

    public static void main(String[] args) {
        changeJsonToJavaCode();

        List<Coordinate> list = new ArrayList<>();
        
        list.add(new Coordinate("116.41957908868788","39.90519744898921"));
        list.add(new Coordinate("116.41991436481476","39.90505547849888"));
        list.add(new Coordinate("116.41948789358139","39.90485383874608"));
        list.add(new Coordinate("116.41912847757338","39.90513778026825"));
        list.add(new Coordinate("116.41905605792998","39.90473861576375"));
        list.add(new Coordinate("116.41914993524551","39.90463368037913"));
        list.add(new Coordinate("116.41954421997072","39.90459870188185"));
        list.add(new Coordinate("116.4196541905403","39.904532859956205"));
        list.add(new Coordinate("116.41991168260574","39.904792112172494"));
        list.add(new Coordinate("116.42018795013426","39.9050781114953"));
        list.add(new Coordinate("116.41989022493362","39.905370282232546"));
        list.add(new Coordinate("116.41935914754868","39.905446411022844"));
        list.add(new Coordinate("116.41903460025787","39.905370282232546"));
        list.add(new Coordinate("116.41896486282349","39.90526534781537"));
        list.add(new Coordinate("116.41957908868788","39.90519744898921"));


        System.out.println(isInPolygon(new Coordinate("116.41980707645416", "39.90437236999738"), list));
    }


    public static void changeJsonToJavaCode() {
        String json = "[[\n" +
                "              116.41957908868788,\n" +
                "              39.90519744898921\n" +
                "            ],\n" +
                "            [\n" +
                "              116.41991436481476,\n" +
                "              39.90505547849888\n" +
                "            ],\n" +
                "            [\n" +
                "              116.41948789358139,\n" +
                "              39.90485383874608\n" +
                "            ],\n" +
                "            [\n" +
                "              116.41912847757338,\n" +
                "              39.90513778026825\n" +
                "            ],\n" +
                "            [\n" +
                "              116.41905605792998,\n" +
                "              39.90473861576375\n" +
                "            ],\n" +
                "            [\n" +
                "              116.41914993524551,\n" +
                "              39.90463368037913\n" +
                "            ],\n" +
                "            [\n" +
                "              116.41954421997072,\n" +
                "              39.90459870188185\n" +
                "            ],\n" +
                "            [\n" +
                "              116.4196541905403,\n" +
                "              39.904532859956205\n" +
                "            ],\n" +
                "            [\n" +
                "              116.41991168260574,\n" +
                "              39.904792112172494\n" +
                "            ],\n" +
                "            [\n" +
                "              116.42018795013426,\n" +
                "              39.9050781114953\n" +
                "            ],\n" +
                "            [\n" +
                "              116.41989022493362,\n" +
                "              39.905370282232546\n" +
                "            ],\n" +
                "            [\n" +
                "              116.41935914754868,\n" +
                "              39.905446411022844\n" +
                "            ],\n" +
                "            [\n" +
                "              116.41903460025787,\n" +
                "              39.905370282232546\n" +
                "            ],\n" +
                "            [\n" +
                "              116.41896486282349,\n" +
                "              39.90526534781537\n" +
                "            ],\n" +
                "            [\n" +
                "              116.41957908868788,\n" +
                "              39.90519744898921\n" +
                "            ]]";

        JSONArray gs = JSON.parseArray(json);
        for (int i = 0; i < gs.size(); i++) {
            System.out.println("list.add(new Coordinate(\""+gs.getJSONArray(i).get(0)+"\",\""+ gs.getJSONArray(i).get(1)+"\"));");
        }
    }
}
