import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { 
  ArrowUp, Briefcase, ChevronDown, Download, GraduationCap, 
  Mail, Phone, QrCode, User, X, Play, Pause, Volume2, Maximize2,
  Plus, Lock, LockOpen, ShieldAlert, RotateCcw, ShieldCheck,
  Pencil, Save, Folder, Upload, LayoutGrid, List, Trash2, FolderPlus, ChevronLeft, ChevronRight,
  Figma, Framer, Diamond, Image as ImageIcon, Palette, Film, Box, Sparkles, Zap, Layout,
  ShoppingBag, ShoppingCart, Store, CreditCard, Tag, PenTool, Type, Layers, Sun, Maximize,
  Lightbulb, Cpu, Shapes, Globe, Cylinder, Brain, Bot, Wand2, Monitor, Layers2, BoxSelect,
  ArrowLeft, Printer, Smartphone, Check, ChevronUp, GripVertical
} from "lucide-react";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import ParticleBackground from './components/ParticleBackground';
import VideoHero from './components/VideoHero';

const GALLERY_ITEMS = [
  { id: 1, title: "艺术探索", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea'/%3E%3Cstop offset='100%25' style='stop-color:%23764ba2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g1)' width='800' height='600'/%3E%3Ccircle cx='400' cy='300' r='150' fill='white' opacity='0.1'/%3E%3Ccircle cx='400' cy='300' r='100' fill='white' opacity='0.2'/%3E%3Ccircle cx='400' cy='300' r='50' fill='white' opacity='0.3'/%3E%3C/svg%3E", type: "image", tag: "AI ART" },
  { id: 2, title: "未来城市", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g2' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%230f0c29'/%3E%3Cstop offset='50%25' style='stop-color:%23302b63'/%3E%3Cstop offset='100%25' style='stop-color:%2324243e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g2)' width='800' height='600'/%3E%3Crect x='100' y='300' width='80' height='300' fill='%231a1a2e'/%3E%3Crect x='200' y='200' width='60' height='400' fill='%2316213e'/%3E%3Crect x='300' y='250' width='100' height='350' fill='%230f3460'/%3E%3Crect x='450' y='150' width='70' height='450' fill='%231a1a2e'/%3E%3Crect x='550' y='350' width='90' height='250' fill='%2316213e'/%3E%3Crect x='680' y='280' width='80' height='320' fill='%230f3460'/%3E%3C/svg%3E", type: "image", tag: "CONCEPT" },
  { id: 3, title: "赛博脉动", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2300f5a0'/%3E%3Cstop offset='50%25' style='stop-color:%2300d9f5'/%3E%3Cstop offset='100%25' style='stop-color:%2300f5a0'/%3E%3C/linearGradient%3E%3Cfilter id='glow'%3E%3CfeGaussianBlur stdDeviation='3' result='coloredBlur'/%3E%3CfeMerge%3E%3CfeMergeNode in='coloredBlur'/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Crect fill='%230a0a0a' width='800' height='600'/%3E%3Ccircle cx='400' cy='300' r='200' fill='none' stroke='url(%23g3)' stroke-width='2' filter='url(%23glow)'/%3E%3Ccircle cx='400' cy='300' r='150' fill='none' stroke='url(%23g3)' stroke-width='1.5' filter='url(%23glow)'/%3E%3Ccircle cx='400' cy='300' r='100' fill='none' stroke='url(%23g3)' stroke-width='1' filter='url(%23glow)'/%3E%3Ccircle cx='400' cy='300' r='30' fill='%2300f5a0' filter='url(%23glow)'/%3E%3C/svg%3E", type: "image", tag: "MOTION" },
  { id: 4, title: "视觉重构", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f093fb'/%3E%3Cstop offset='50%25' style='stop-color:%23f5576c'/%3E%3Cstop offset='100%25' style='stop-color:%23f093fb'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='%231a1a2e' width='800' height='600'/%3E%3Cpolygon points='400,50 600,250 600,550 400,600 200,550 200,250' fill='none' stroke='url(%23g4)' stroke-width='3'/%3E%3Cpolygon points='400,120 520,300 520,480 400,520 280,480 280,300' fill='url(%23g4)' opacity='0.3'/%3E%3Ccircle cx='400' cy='300' r='40' fill='url(%23g4)'/%3E%3C/svg%3E", type: "image", tag: "3D RENDER" },
  { id: 5, title: "动态流线", img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g5' x1='0%25' y1='50%25' x2='100%25' y2='50%25'%3E%3Cstop offset='0%25' style='stop-color:%23ff6a00'/%3E%3Cstop offset='50%25' style='stop-color:%23ee0979'/%3E%3Cstop offset='100%25' style='stop-color:%23ff6a00'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='%230a0a0a' width='800' height='600'/%3E%3Cpath d='M0,100 Q200,50 400,150 T800,200' fill='none' stroke='url(%23g5)' stroke-width='4' opacity='0.8'/%3E%3Cpath d='M0,250 Q200,200 400,300 T800,350' fill='none' stroke='url(%23g5)' stroke-width='3' opacity='0.6'/%3E%3Cpath d='M0,400 Q200,350 400,450 T800,500' fill='none' stroke='url(%23g5)' stroke-width='4' opacity='0.8'/%3E%3Cpath d='M0,550 Q200,500 400,600 T800,550' fill='none' stroke='url(%23g5)' stroke-width='3' opacity='0.6'/%3E%3C/svg%3E", type: "image", tag: "ABSTRACT" },
];

const PORTFOLIO_ITEMS = [
  { 
    id: 1, 
    title: "AIGC+AE 头像框动效设计", 
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='pg1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231a1a2e'/%3E%3Cstop offset='100%25' style='stop-color:%2316213e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23pg1)' width='800' height='600'/%3E%3Ccircle cx='400' cy='300' r='120' fill='%231a1a2e' stroke='%23e94560' stroke-width='3'/%3E%3Ccircle cx='400' cy='300' r='90' fill='none' stroke='%23e94560' stroke-width='2'/%3E%3Ccircle cx='400' cy='300' r='60' fill='%23e94560' opacity='0.2'/%3E%3Ctext x='400' y='315' text-anchor='middle' fill='%23e94560' font-size='24' font-weight='bold'%3EAIGC%3C/text%3E%3C/svg%3E", 
    type: "image",
    categories: ["动效设计", "AI作品"], 
    tags: ["AIGC", "AE"],
    isFeature: true,
    walmartImages: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cdefs%3E%3ClinearGradient id='wm1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%234facfe'/%3E%3Cstop offset='100%25' style='stop-color:%2300f2fe'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='%231a1a2e' width='800' height='800'/%3E%3Crect x='100' y='100' width='600' height='600' fill='none' stroke='url(%23wm1)' stroke-width='4'/%3E%3Crect x='200' y='200' width='400' height='400' fill='url(%23wm1)' opacity='0.2'/%3E%3Ccircle cx='400' cy='400' r='80' fill='url(%23wm1)'/%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cdefs%3E%3ClinearGradient id='wm2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f093fb'/%3E%3Cstop offset='100%25' style='stop-color:%23f5576c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='%231a1a2e' width='800' height='800'/%3E%3Ccircle cx='400' cy='400' r='250' fill='none' stroke='url(%23wm2)' stroke-width='3'/%3E%3Ccircle cx='400' cy='400' r='180' fill='none' stroke='url(%23wm2)' stroke-width='2'/%3E%3Ccircle cx='400' cy='400' r='100' fill='url(%23wm2)' opacity='0.3'/%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cdefs%3E%3ClinearGradient id='wm3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2343e97b'/%3E%3Cstop offset='100%25' style='stop-color:%2338f9d7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='%231a1a2e' width='800' height='800'/%3E%3Cpolygon points='400,100 650,350 400,600 150,350' fill='none' stroke='url(%23wm3)' stroke-width='4'/%3E%3Cpolygon points='400,200 550,350 400,500 250,350' fill='url(%23wm3)' opacity='0.2'/%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cdefs%3E%3ClinearGradient id='wm4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23fa709a'/%3E%3Cstop offset='100%25' style='stop-color:%23fee140'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='%231a1a2e' width='800' height='800'/%3E%3Cpath d='M200,400 Q350,200 500,400 T800,400' fill='none' stroke='url(%23wm4)' stroke-width='6'/%3E%3Cpath d='M100,500 Q250,300 400,500 T700,500' fill='none' stroke='url(%23wm4)' stroke-width='4' opacity='0.6'/%3E%3C/svg%3E"
    ],
    aPlusPCImages: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cdefs%3E%3ClinearGradient id='apc1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea'/%3E%3Cstop offset='100%25' style='stop-color:%23764ba2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='%230f0f1a' width='1000' height='1000'/%3E%3Crect x='100' y='100' width='800' height='800' fill='none' stroke='url(%23apc1)' stroke-width='3'/%3E%3Crect x='200' y='200' width='600' height='600' fill='url(%23apc1)' opacity='0.1'/%3E%3Ccircle cx='500' cy='500' r='200' fill='none' stroke='url(%23apc1)' stroke-width='2'/%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 1000'%3E%3Cdefs%3E%3ClinearGradient id='apc2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2300f5a0'/%3E%3Cstop offset='100%25' style='stop-color:%2300d9f5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='%230f0f1a' width='1000' height='1000'/%3E%3Ccircle cx='500' cy='500' r='300' fill='none' stroke='url(%23apc2)' stroke-width='4'/%3E%3Ccircle cx='500' cy='500' r='200' fill='url(%23apc2)' opacity='0.15'/%3E%3Ccircle cx='500' cy='500' r='80' fill='url(%23apc2)'/%3E%3C/svg%3E"
    ],
    aPlusMobileImages: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1200'%3E%3Cdefs%3E%3ClinearGradient id='am1' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea'/%3E%3Cstop offset='100%25' style='stop-color:%23764ba2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='%230f0f1a' width='800' height='1200'/%3E%3Crect x='50' y='50' width='700' height='1100' fill='none' stroke='url(%23am1)' stroke-width='3'/%3E%3Crect x='150' y='150' width='500' height='500' fill='url(%23am1)' opacity='0.15'/%3E%3Crect x='150' y='750' width='500' height='300' fill='url(%23am1)' opacity='0.15'/%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1200'%3E%3Cdefs%3E%3ClinearGradient id='am2' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23f093fb'/%3E%3Cstop offset='100%25' style='stop-color:%23f5576c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='%230f0f1a' width='800' height='1200'/%3E%3Ccircle cx='400' cy='300' r='150' fill='url(%23am2)' opacity='0.3'/%3E%3Ccircle cx='400' cy='600' r='200' fill='none' stroke='url(%23am2)' stroke-width='3'/%3E%3Ccircle cx='400' cy='900' r='100' fill='url(%23am2)' opacity='0.4'/%3E%3C/svg%3E"
    ]
  },
  { 
    id: 2, 
    title: "blender 小狐狸建模场景", 
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='pg2' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231a1a2e'/%3E%3Cstop offset='100%25' style='stop-color:%232d3436'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23pg2)' width='800' height='600'/%3E%3Cellipse cx='400' cy='500' rx='300' ry='80' fill='%23636e72' opacity='0.3'/%3E%3Ccircle cx='400' cy='300' r='100' fill='%23fdcb6e'/%3E%3Ccircle cx='360' cy='280' r='15' fill='%232d3436'/%3E%3Ccircle cx='440' cy='280' r='15' fill='%232d3436'/%3E%3Cellipse cx='400' cy='330' rx='25' ry='15' fill='%23e17055'/%3E%3C/svg%3E", 
    type: "image",
    categories: ["建模"], 
    tags: ["场景建模", "自学建模"],
    isFeature: true
  },
  { 
    id: 3, 
    title: "智能家居 3.0 迭代优化升级", 
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='pg3' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231a1a2e'/%3E%3Cstop offset='50%25' style='stop-color:%2316213e'/%3E%3Cstop offset='100%25' style='stop-color:%230f3460'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23pg3)' width='800' height='600'/%3E%3Crect x='100' y='150' width='120' height='150' fill='%232d3436'/%3E%3Crect x='130' y='180' width='60' height='40' fill='%2300b894' opacity='0.6'/%3E%3Crect x='280' y='120' width='180' height='200' fill='%232d3436'/%3E%3Crect x='310' y='150' width='120' height='60' fill='%236c5ce7' opacity='0.7'/%3E%3Crect x='520' y='160' width='100' height='100' fill='%232d3436'/%3E%3Ccircle cx='570' cy='210' r='30' fill='%23fdcb6e'/%3E%3C/svg%3E", 
    type: "image",
    categories: ["UI设计"], 
    tags: ["UI设计", "交互"],
    isFeature: true
  },
  { 
    id: 4, 
    title: "元宇宙空间视觉交互", 
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='pg4' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%230f0c29'/%3E%3Cstop offset='100%25' style='stop-color:%23302b63'/%3E%3C/linearGradient%3E%3Cfilter id='g4glow'%3E%3CfeGaussianBlur stdDeviation='2'/%3E%3C/filter%3E%3C/defs%3E%3Crect fill='url(%23pg4)' width='800' height='600'/%3E%3Ccircle cx='200' cy='200' r='60' fill='none' stroke='%2300f5a0' stroke-width='2' filter='url(%23g4glow)'/%3E%3Ccircle cx='600' cy='400' r='80' fill='none' stroke='%2300d9f5' stroke-width='2' filter='url(%23g4glow)'/%3E%3Ccircle cx='400' cy='500' r='40' fill='none' stroke='%23f093fb' stroke-width='2' filter='url(%23g4glow)'/%3E%3Cline x1='200' y1='200' x2='600' y2='400' stroke='%2300f5a0' stroke-width='1' opacity='0.3'/%3E%3Cline x1='600' y1='400' x2='400' y2='500' stroke='%2300d9f5' stroke-width='1' opacity='0.3'/%3E%3Cline x1='400' y1='500' x2='200' y2='200' stroke='%23f093fb' stroke-width='1' opacity='0.3'/%3E%3C/svg%3E", 
    type: "image",
    categories: ["UI设计", "建模"], 
    tags: ["VR", "未来感"]
  },
  { 
    id: 5, 
    title: "拟态流体图标动态系统", 
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3Cfilter id='glass'%3E%3CfeGaussianBlur stdDeviation='10'/%3E%3C/filter%3E%3ClinearGradient id='pg5' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23667eea'/%3E%3Cstop offset='100%25' style='stop-color:%23764ba2'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='%231a1a2e' width='800' height='600'/%3E%3Crect x='150' y='150' width='200' height='150' fill='white' opacity='0.1' filter='url(%23glass)' rx='20'/%3E%3Crect x='450' y='200' width='180' height='120' fill='white' opacity='0.15' filter='url(%23glass)' rx='15'/%3E%3Ccircle cx='650' cy='180' r='50' fill='white' opacity='0.12' filter='url(%23glass)'/%3E%3Crect x='200' y='380' width='120' height='100' fill='white' opacity='0.08' filter='url(%23glass)' rx='10'/%3E%3Ccircle cx='550' cy='420' r='60' fill='white' opacity='0.1' filter='url(%23glass)'/%3E%3C/svg%3E", 
    type: "image",
    categories: ["动效设计"], 
    tags: ["Glassmorphism", "Motion"]
  },
  { 
    id: 6, 
    title: "AI 生成：超写实人物肖像辑", 
    image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='pg6' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231a1a2e'/%3E%3Cstop offset='100%25' style='stop-color:%232d3436'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23pg6)' width='800' height='600'/%3E%3Ccircle cx='400' cy='300' r='180' fill='%23f5f6fa'/%3E%3Ccircle cx='400' cy='300' r='150' fill='%23dfe6e9'/%3E%3Ccircle cx='350' cy='280' r='20' fill='%232d3436'/%3E%3Ccircle cx='450' cy='280' r='20' fill='%232d3436'/%3E%3Cellipse cx='400' cy='330' rx='25' ry='15' fill='none' stroke='%23e17055' stroke-width='2'/%3E%3C/svg%3E", 
    type: "image",
    categories: ["AI作品"], 
    tags: ["Stable Diffusion", "SDXL"]
  },
];

const STAGGER_CHILDREN = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const EnhancedBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax offsets for background elements
  const y1 = useTransform(scrollY, [0, 2000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -300]);
  const y3 = useTransform(scrollY, [0, 2000], [0, 150]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-50 overflow-hidden">
      {/* Aurora Atmosphere - Large, slow moving soft glows with parallax */}
      <div className="absolute inset-0 opacity-[0.25]">
        <motion.div 
          style={{ y: y1 }}
          animate={{
            scale: [1, 1.25, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[25%] -left-[10%] w-[100%] h-[100%] bg-blue-600/10 rounded-full blur-[150px]"
        />
        <motion.div 
           style={{ y: y2 }}
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[30%] -right-[15%] w-[110%] h-[110%] bg-purple-600/10 rounded-full blur-[180px]"
        />
        <motion.div 
          style={{ y: y3 }}
          animate={{
            scale: [1, 1.4, 1],
            x: ['10%', '-10%', '10%'],
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[15%] w-[80%] h-[80%] bg-teal-500/05 rounded-full blur-[200px]"
        />
        <motion.div 
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[40%] w-[50%] h-[50%] bg-rose-500/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Deep Shadow Vignette & Atmosphere */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050505]/40 to-black z-10" />

      {/* Interactive Cursor Glow - "The Spotlight" */}
      <motion.div 
        animate={{
          x: mousePos.x - 450,
          y: mousePos.y - 450,
        }}
        transition={{ type: "spring", damping: 60, stiffness: 120, mass: 1.2 }}
        className="absolute w-[900px] h-[900px] bg-blue-400/[0.08] rounded-full blur-[120px] z-20 pointer-events-none"
      />

      {/* Glass Grain Texture - Subtle animated noise */}
      <motion.div 
        animate={{
          x: [-50, 50, -25, 25, 0],
          y: [-50, 25, 50, -25, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-[100px] grain opacity-[0.04] mix-blend-overlay" 
      />

      {/* Tech Grid - Fine & Sophisticated */}
      <div className="absolute inset-0 tech-grid opacity-[0.15] mix-blend-screen" />
      
      {/* Decorative Lights */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />
    </div>
  );
};

const INITIAL_EXPERIENCES = [
  {
    id: 1,
    company: "劲速（深圳）云计算科技有限公司",
    role: "UI 设计师",
    period: "2025.04 - 2025.10",
    description: [
      "负责公司核心云计算平台的 UI 界面设计与交互逻辑优化，提升复杂数据的可视化体验。",
      "主导项目改版设计，建立适应业务发展的视觉识别系统，并协同前端团队完成高保真交付。",
      "参与跨部门设计协同，沉淀大屏可视化设计规范，支撑多个政企云服务项目落地。",
      "关注行业前沿设计动态与 AI 提效，利用工具驱动设计产能升级，减少重复性设计产出。"
    ]
  },
  {
    id: 2,
    company: "元点共振天",
    role: "UX 设计师",
    period: "2024.11 - 2025.03",
    description: [
      "独立牵头负责团队项目全流程推进，完成从需求挖掘到设计交付的统筹闭环。",
      "建立并维护设计规范组件库，提供标准化的设计资源，大幅提升研发协同效率。",
      "主导 FaithTime App 从 0 到 1 搭建，精准捕捉业务核心点，明确用户画像。",
      "负责大型线下活动视觉系统设计，包括视觉 KV、线上线下多渠道视觉宣发。"
    ]
  }
];

const ICON_PICKER_OPTIONS = [
  { name: 'Ps', label: 'Photoshop' },
  { name: 'Ai', label: 'Illustrator' },
  { name: 'Ae', label: 'After Effects' },
  { name: 'Pr', label: 'Premiere' },
  { name: 'C4D', label: 'Cinema 4D' },
  { name: 'OC', label: 'Octane' },
  { name: 'CR', label: 'Corona' },
  { name: 'SD', label: 'Stable Diff' },
  { name: 'MJ', label: 'Midjourney' },
  { name: 'CF', label: 'ComfyUI' },
  { name: 'Figma', label: 'Figma' },
  { name: 'Framer', label: 'Framer' },
  { name: 'ShoppingBag', label: '电商' },
  { name: 'ShoppingCart', label: '购物车' },
  { name: 'Palette', label: '平面/色彩' },
  { name: 'PenTool', label: '钢笔' },
  { name: 'Type', label: '文字' },
  { name: 'Layers', label: '图层' },
  { name: 'Sun', label: '渲染/光照' },
  { name: 'Lightbulb', label: '灵感' },
  { name: 'Cpu', label: '硬件' },
  { name: 'Box', label: '建模' },
  { name: 'Shapes', label: '几何' },
  { name: 'Sparkles', label: 'AI/火花' },
  { name: 'Zap', label: '动效/闪电' },
  { name: 'Brain', label: '心智' },
  { name: 'Bot', label: '机器人' },
  { name: 'Wand2', label: '魔法棒' },
  { name: 'ImageIcon', label: '图片' },
  { name: 'Film', label: '视频' },
  { name: 'Monitor', label: '交互' },
  { name: 'Diamond', label: 'Diamond' },
  { name: 'Layout', label: '布局' },
  { name: 'LayoutGrid', label: '网格' },
];

const IconRenderer = ({ name, className }: { name: string, className?: string }) => {
  if (!name) return <Sparkles className={className || "w-4 h-4"} />;

  // Support for custom uploaded images as icons (URL or data URI)
  const isImageUrl = name.includes('/') || name.includes('.') || name.startsWith('data:');

  if (isImageUrl && !ICON_PICKER_OPTIONS.some(opt => opt.name === name)) {
    return (
      <div className={`${className || "w-5 h-5"} rounded-lg overflow-hidden bg-white/5 flex items-center justify-center border border-white/10 ring-1 ring-white/5 shadow-inner`}>
        <img src={name} alt="" className="w-full h-full object-cover" />
      </div>
    );
  }

  const brandColors: Record<string, string> = {
    'Ps': '#31A8FF',
    'Ai': '#FF9A00',
    'Ae': '#D291FF',
    'Pr': '#2A005E',
    'C4D': '#0074FF',
    'OC': '#FFAA00',
    'CR': '#FF4D00',
    'SD': '#4AB9FF',
    'MJ': '#00F2FF',
    'CF': '#1A44D1',
    'Xd': '#FF61F6',
  };

  if (name === 'CR') {
    return (
      <div 
        className={`${className || "w-5 h-5"} rounded-lg flex items-center justify-center shadow-lg`}
        style={{ backgroundColor: '#FF4D00' }}
      >
        <Palette className="w-[70%] h-[70%] text-white" />
      </div>
    );
  }
  
  if (name === 'C4D') {
    return (
      <div 
        className={`${className || "w-5 h-5"} relative rounded-full overflow-hidden shadow-xl ring-2 ring-blue-500/20`}
        style={{ 
          background: 'radial-gradient(circle at 35% 35%, #5db6ff 0%, #0047ab 100%)',
        }}
      >
        <div className="absolute inset-[2%] rounded-full border-[2.5px] border-transparent border-t-white/90 border-r-white/90 rotate-[140deg] scale-[1.05]" />
        <div className="absolute inset-[15%] rounded-full border-[3px] border-transparent border-b-white/30 border-l-white/30 rotate-[140deg]" />
        <div className="absolute top-[10%] left-[25%] w-[30%] h-[20%] bg-white/40 rounded-full blur-[0.5px] rotate-[-15deg]" />
      </div>
    );
  }

  if (brandColors[name]) {
    return (
      <div 
        className={`${className || "w-5 h-5"} rounded-lg flex items-center justify-center font-bold text-[11px] leading-none text-white overflow-hidden shadow-lg border border-white/10`}
        style={{ 
          backgroundColor: brandColors[name],
          color: name === 'CF' ? '#EFFF00' : 'white'
        }}
      >
        <span className={`scale-[0.85] ${name === 'CF' ? 'font-black italic' : ''}`}>{name === 'CF' ? 'C' : name}</span>
      </div>
    );
  }

  const icons: Record<string, any> = {
    Figma, Framer, Diamond, Box, Sparkles, Zap, Layout, Palette, Film,
    ShoppingBag, ShoppingCart, Store, CreditCard, Tag, PenTool, Type, Layers, Sun, Maximize,
    Lightbulb, Cpu, Shapes, Globe, Cylinder, Brain, Bot, Wand2, Monitor, Layers2, BoxSelect,
    ImageIcon, User, Mail, Phone, Briefcase, LayoutGrid, Heart: Sparkles, Star: Sparkles
  };
  const Icon = icons[name] || Sparkles;
  return <Icon className={className || "w-4 h-4"} />;
};

const IconPicker = ({ selected, onSelect, onOpenLibrary }: { selected: string, onSelect: (name: string) => void, onOpenLibrary: () => void }) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-black/40 rounded-3xl border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 p-3 flex items-center justify-center border border-white/10">
            <IconRenderer name={selected} className="w-full h-full" />
          </div>
          <div>
            <div className="text-white font-medium mb-1 line-clamp-1 max-w-[150px]">{selected.length > 20 ? '自定义图片' : selected}</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">当前图标类型</div>
          </div>
        </div>
        <button 
          onClick={onOpenLibrary}
          className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 transition-all active:scale-95 flex items-center gap-2"
        >
          <ImageIcon className="w-4 h-4" />
          选择素材作为图标
        </button>
      </div>

      <div className="h-px bg-white/5" />

      <div>
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">系统预设</label>
        <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 max-h-32 overflow-y-auto pr-2 scrollbar-hide">
          {ICON_PICKER_OPTIONS.map((opt) => (
            <button
              key={opt.name}
              type="button"
              onClick={() => onSelect(opt.name)}
              className={`p-2 rounded-xl flex items-center justify-center transition-all outline-none border ${selected === opt.name ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-900/40' : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10 hover:text-white'}`}
            >
              <IconRenderer name={opt.name} className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ResumePage = ({ onBack, data }: { onBack: () => void, data: any }) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  // Helper for hex colors to avoid html2canvas oklab issues
  const colors = {
    blue600: '#2563eb',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray800: '#1f2937',
    black: '#000000',
    white: '#ffffff'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Add print styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        @page {
          size: A4;
          margin: 0;
        }
        body {
          background-color: white !important;
          margin: 0;
          padding: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        html {
          background-color: white !important;
          margin: 0;
          padding: 0;
        }
        .no-print {
          display: none !important;
        }
        header, footer {
          display: none !important;
        }
        ::-webkit-scrollbar {
          display: none;
        }
        .resume-container {
          box-shadow: none !important;
        }
      }
      @media all {
        .resume-content-wrapper {
          max-height: 295mm;
          overflow: hidden;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const normalizeColorsForCanvas = (element: HTMLElement) => {
    const colorProps = ['color', 'backgroundColor', 'borderColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor', 'fill', 'stroke'];
    
    const traverse = (el: HTMLElement) => {
      const computedStyle = window.getComputedStyle(el);
      let hasChanges = false;
      
      for (const prop of colorProps) {
        const value = computedStyle[prop as any];
        if (value && (value.includes('oklab(') || value.includes('oklch(') || value.includes('color-mix('))) {
          try {
            const tempDiv = document.createElement('div');
            tempDiv.style.color = value;
            document.body.appendChild(tempDiv);
            const normalized = window.getComputedStyle(tempDiv).color;
            document.body.removeChild(tempDiv);
            
            if (normalized && !normalized.includes('oklab') && !normalized.includes('oklch') && !normalized.includes('color-mix')) {
              (el.style as any)[prop] = normalized;
              hasChanges = true;
            }
          } catch (e) {
            (el.style as any)[prop] = prop === 'color' ? '#333333' : prop.startsWith('background') ? '#ffffff' : 'transparent';
          }
        }
      }
      
      const children = el.querySelectorAll(':scope > *');
      children.forEach(child => {
        if (child instanceof HTMLElement) {
          traverse(child);
        }
      });
    };
    
    traverse(element);
  };

  const handleDownloadJPG = async () => {
    const element = resumeRef.current;
    if (!element) {
      console.error('resumeRef is null');
      alert('无法找到简历内容');
      return;
    }

    try {
      const clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.style.position = 'fixed';
      clonedElement.style.top = '-9999px';
      clonedElement.style.left = '-9999px';
      clonedElement.style.zIndex = '9999';
      document.body.appendChild(clonedElement);

      const styleSheets = document.querySelectorAll('style');
      const stylesToCopy = Array.from(styleSheets).map(s => s.textContent || '').join('\n')
        .replace(/oklch\([^)]+\)/g, '#3b82f6')
        .replace(/oklab\([^)]+\)/g, '#3b82f6')
        .replace(/color-mix\([^)]+\)/g, '#3b82f6');

      const tempStyle = document.createElement('style');
      tempStyle.textContent = stylesToCopy;
      clonedElement.appendChild(tempStyle);

      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        onclone: (doc) => {
          const styles = doc.querySelectorAll('style');
          styles.forEach(style => {
            if (style.textContent) {
              style.textContent = style.textContent.replace(/oklch\([^)]+\)/g, '#3b82f6');
              style.textContent = style.textContent.replace(/oklab\([^)]+\)/g, '#3b82f6');
              style.textContent = style.textContent.replace(/color-mix\([^)]+\)/g, '#3b82f6');
            }
          });
        }
      });
      
      document.body.removeChild(clonedElement);
      
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.download = `${data.name}-个人作品集.jpg`;
      link.href = imgData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to generate JPG:', error);
      alert(`下载失败: ${(error as Error).message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#333] font-sans selection:bg-blue-100 print:bg-white pt-10 pb-20 print:p-0">
      <div ref={resumeRef} className="resume-container w-[210mm] mx-auto bg-white shadow-[0_20px_80px_rgba(0,0,0,0.1)] print:shadow-none min-h-[297mm] p-8 relative overflow-hidden flex flex-col">
        {/* Floating Controls */}
        <div className="fixed top-8 left-8 flex flex-col gap-4 no-print z-[100]">
          <button 
            onClick={onBack}
            className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center text-gray-600 hover:text-black hover:bg-white shadow-2xl transition-all active:scale-90 border border-gray-100"
            title="返回首页"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <button 
              onClick={handleDownloadJPG}
              className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-indigo-500 transition-all active:scale-90"
              title="下载简历"
            >
              <Download className="w-6 h-6" />
            </button>

          <button 
            onClick={() => {
              document.title = `${data.name}-个人作品集`;
              setTimeout(() => window.print(), 100);
            }}
            className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:bg-blue-500 transition-all active:scale-90"
            title="直接打印简历"
          >
            <Printer className="w-6 h-6" />
          </button>
        </div>

        {/* Top Header Section */}
        <div className="flex gap-8 items-start mb-8 border-b pb-6" style={{ borderColor: colors.gray100 }}>
          <div className="w-[180px] aspect-[3/4] rounded-[1rem] overflow-hidden flex-shrink-0 shadow-xl border-[6px] transform -rotate-1 group transition-transform hover:rotate-0 duration-500" style={{ backgroundColor: colors.gray100, borderColor: colors.white }}>
            <img src={data.profileImage} alt={data.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          
          <div className="flex-1">
            <div className="space-y-0.5 mb-4">
              <h1 className="text-4xl font-black tracking-tighter text-black leading-none mb-1">
                {data.name}
              </h1>
              <div className="text-lg font-bold tracking-tight" style={{ color: colors.gray400 }}>
                {data.age} <span className="mx-1.5 opacity-30">/</span> {data.role}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-4">
              <div className="space-y-0.5">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 block" style={{ color: colors.gray800 }}>学历 Education</span>
                <span className="text-base font-bold leading-none block" style={{ color: colors.gray800 }}>{data.degree}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 block" style={{ color: colors.gray800 }}>专业 Major</span>
                <span className="text-base font-bold leading-none block" style={{ color: colors.gray800 }}>{data.major}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 block" style={{ color: colors.gray800 }}>电话 Mobile</span>
                <span className="text-base font-bold leading-none block font-mono" style={{ color: colors.gray800 }}>{data.phone}</span>
              </div>
              <div className="space-y-0.5">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 block" style={{ color: colors.gray800 }}>邮箱 Email</span>
                <span className="text-base font-bold leading-none block font-mono" style={{ color: colors.gray800 }}>{data.email}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-dashed border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: colors.gray400 }}>核心技能 HARD SKILLS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.tools.slice(0, 10).map((tool: any) => (
                  <span 
                    key={tool.id} 
                    className="flex-grow text-center px-4 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[11px] font-bold text-gray-700 hover:bg-white hover:border-blue-200 hover:text-blue-600 hover:shadow-sm transition-all cursor-default"
                  >
                    {tool.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="resume-content-wrapper relative pl-20 space-y-6">
          {/* Vertical Timeline Line */}
          <div 
            className="absolute left-[2.5rem] top-4 bottom-[-3rem] border-l-2 border-dashed" 
            style={{ 
              borderColor: colors.gray300,
              maskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 65%, transparent 100%)'
            }} 
          />

          {/* Experience */}
          <div className="relative">
            <div className="absolute -left-[3.5rem] -top-0.5 w-9 h-9 rounded-[10px] flex items-center justify-center bg-white border-2 shadow-sm z-10" style={{ borderColor: colors.gray100 }}>
              <Briefcase className="w-4 h-4" style={{ color: colors.blue600 }} />
            </div>

            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-3xl font-black tracking-tighter uppercase text-black">工作经历</h2>
              <div className="flex-1 h-px opacity-50" style={{ backgroundColor: colors.gray100 }} />
            </div>
            
            <div className="space-y-5">
              {data.experiences.map((exp: any) => (
                <div key={exp.id} className="relative">
                  <div className="absolute -left-[2.875rem] top-1.5 w-4 h-4 rounded-full flex items-center justify-center bg-white z-10 shadow-sm border" style={{ borderColor: colors.gray100 }}>
                    <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.4)]" />
                  </div>
                  
                  <div className="mb-2.5">
                    <h3 className="text-xl font-black text-black leading-tight mb-1">{exp.company}</h3>
                    <div className="flex items-center gap-2 text-sm font-bold tracking-wide">
                    <span style={{ color: '#a855f7' }}>{exp.role}</span>
                    <span className="opacity-20" style={{ color: colors.gray400 }}>|</span>
                    <span style={{ color: colors.gray400 }}>{exp.period}</span>
                  </div>
                  </div>

                  <div className="space-y-2">
                    <ul className="space-y-2">
                      {exp.description.map((desc: string, i: number) => (
                        <li key={i} className="flex gap-2.5 items-start group">
                          <span className="mt-[0.4rem] w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: '#a855f7', boxShadow: '0 0 6px rgba(168, 85, 247, 0.4)' }} />
                          <p className="text-[15px] leading-[1.5] font-medium" style={{ color: colors.gray600 }}>
                            {desc}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advantages */}
          <div className="relative">
            <div className="absolute -left-[3.5rem] -top-0.5 w-9 h-9 rounded-[10px] flex items-center justify-center bg-white border-2 shadow-sm z-10" style={{ borderColor: colors.gray100 }}>
              <Sparkles className="w-4 h-4" style={{ color: colors.blue600 }} />
            </div>

            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-3xl font-black tracking-tighter uppercase text-black">个人优势</h2>
              <div className="flex-1 h-px opacity-50" style={{ backgroundColor: colors.gray100 }} />
            </div>
            <ul className="space-y-3">
              {data.advantages.map((adv: string, i: number) => (
                <li key={i} className="flex gap-3 items-start relative group">
                  <div className="absolute -left-[2.875rem] top-[3px] w-4 h-4 rounded-full flex items-center justify-center bg-white z-10 shadow-sm border" style={{ borderColor: colors.gray100 }}>
                    <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.4)]" />
                  </div>
                  
                  <p className="text-[15px] leading-[1.5] font-semibold italic" style={{ color: colors.gray600 }}>
                    {adv}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Accent */}
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 print:opacity-100" />
      </div>
    </div>
  );
};

const INITIAL_TOOLS = [
  { id: 1, name: "Figma", iconName: "Figma", color: "text-orange-400" },
  { id: 2, name: "Sketch", iconName: "Diamond", color: "text-amber-400" },
  { id: 3, name: "Photoshop", iconName: "Ps", color: "text-[#31A8FF]" },
  { id: 4, name: "Illustrator", iconName: "Ai", color: "text-[#FF9A00]" },
  { id: 5, name: "After Effects", iconName: "Ae", color: "text-[#D291FF]" },
  { id: 6, name: "Cinema 4D", iconName: "C4D", color: "text-[#0074FF]" },
  { id: 7, name: "Octane", iconName: "OC", color: "text-[#FFAA00]" },
  { id: 8, name: "Stable Diffusion", iconName: "SD", color: "text-[#4AB9FF]" },
  { id: 9, name: "Midjourney", iconName: "MJ", color: "text-[#00F2FF]" },
  { id: 10, name: "ComfyUI", iconName: "CF", color: "text-[#1A44D1]" }
];

const INITIAL_CATEGORIES = [
  { name: "全部", displayType: "A+" },
  { name: "UI设计", displayType: "A+" },
  { name: "建模", displayType: "A+" },
  { name: "动效设计", displayType: "A+" },
  { name: "AI作品", displayType: "A+" }
];

const DISPLAY_TYPES = [
  { label: "套图/A+", value: "A+" },
  { label: "套图", value: "gallery" },
  { label: "正方形 1:1", value: "1:1" },
  { label: "竖版 9:16", value: "9:16" },
  { label: "横版 16:9", value: "16:9" },
  { label: "横长版 4:3", value: "4:3" },
  { label: "竖长版 3:4", value: "3:4" },
  { label: "其他", value: "other" }
];

const INITIAL_EXPERTISE_ITEMS = [
  { id: 1, tag: "Motion", iconName: "Zap", title: "动效设计", desc: "为界面注入生命力与流畅体验", color: "hover:border-purple-500/30", colSpan: "col-span-1" },
  { id: 2, tag: "3D", iconName: "Box", title: "3D 建模", desc: "构建精致的三维模型与场景", color: "hover:border-blue-500/30", colSpan: "col-span-1" },
  { id: 3, tag: "UI/UX", iconName: "Layout", title: "UI/UX 设计", desc: "创造直观、优雅的用户界面与交互体验，深度整合用户需求与商业目标", color: "hover:border-pink-500/30", colSpan: "col-span-1 md:col-span-2" },
  { id: 4, tag: "AI", iconName: "Sparkles", title: "AI 创作", desc: "运用 Midjourney, Stable Diffusion 等 AI 工具探索设计新边界，提升创作效能", color: "hover:border-cyan-500/30", colSpan: "col-span-1 md:col-span-2" },
  { id: 5, tag: "Visual", iconName: "Palette", title: "视觉设计", desc: "平面设计与品牌视觉系统", color: "hover:border-amber-500/30", colSpan: "col-span-1" },
  { id: 6, tag: "Prototype", iconName: "Monitor", title: "原型交互", desc: "高仿真原型与交互设计", color: "hover:border-emerald-500/30", colSpan: "col-span-1" }
];

const INITIAL_SOCIALS = [
  { 
    name: "微信", 
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='white' width='200' height='200'/%3E%3Crect fill='%23111' x='10' y='10' width='180' height='180' rx='10'/%3E%3C/svg%3E", 
    color: "group-hover:border-[#07C160]/50",
    glow: "bg-[#07C160]/5",
    dot: "bg-[#07C160]"
  },
  { 
    name: "QQ", 
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='white' width='200' height='200'/%3E%3Crect fill='%23111' x='10' y='10' width='180' height='180' rx='10'/%3E%3C/svg%3E", 
    color: "group-hover:border-[#12B7F5]/50",
    glow: "bg-[#12B7F5]/5",
    dot: "bg-[#12B7F5]"
  },
  { 
    name: "小红书", 
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='white' width='200' height='200'/%3E%3Crect fill='%23111' x='10' y='10' width='180' height='180' rx='10'/%3E%3C/svg%3E", 
    color: "group-hover:border-[#FF2442]/50",
    glow: "bg-[#FF2442]/5",
    dot: "bg-[#FF2442]"
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalIsScrolled, setModalIsScrolled] = useState(false);
  const [activeHeroButton, setActiveHeroButton] = useState(false);
  const [activeIdx, setActiveIdx] = useState(2);
  const [activeCategory, setActiveCategory] = useState("大件家居");
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [zoomItem, setZoomItem] = useState<any | null>(null);

  const modalScrollRef = useRef<HTMLDivElement>(null);
  const [showModalBackToTop, setShowModalBackToTop] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (!isAdminMode) {
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isAdminMode) {
        if (e.key === "F12") {
          e.preventDefault();
          return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'i' || e.key === 'I')) {
          e.preventDefault();
          return false;
        }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'i' || e.key === 'I')) {
          e.preventDefault();
          return false;
        }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'j' || e.key === 'J')) {
          e.preventDefault();
          return false;
        }
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'c' || e.key === 'C')) {
          e.preventDefault();
          return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
          e.preventDefault();
          return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
          e.preventDefault();
          return false;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
          e.preventDefault();
          return false;
        }
      }
    };

    const handleCopy = (e: ClipboardEvent) => {
      if (!isAdminMode) {
        e.preventDefault();
      }
    };

    const handleCut = (e: ClipboardEvent) => {
      if (!isAdminMode) {
        e.preventDefault();
      }
    };

    const handleSelectStart = (e: Event) => {
      if (!isAdminMode) {
        e.preventDefault();
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if (!isAdminMode && e.target && (e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!isAdminMode && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("copy", handleCopy);
    window.addEventListener("cut", handleCut);
    window.addEventListener("selectstart", handleSelectStart);
    window.addEventListener("dragstart", handleDragStart);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("copy", handleCopy);
      window.removeEventListener("cut", handleCut);
      window.removeEventListener("selectstart", handleSelectStart);
      window.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [isAdminMode]);

  const [experiences, setExperiences] = useState(INITIAL_EXPERIENCES);
  const [tools, setTools] = useState(INITIAL_TOOLS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [showCategoryEditModal, setShowCategoryEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{ oldName: string, newName: string, displayType: string } | null>(null);
  const [draggedCategory, setDraggedCategory] = useState<string | null>(null);
  const [dragOverCategory, setDragOverCategory] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id?: number, ids?: number[], name?: string, folder?: string, type: 'experience' | 'tool' | 'category'| 'materialTag' | 'materialItem' | 'materialItems' | 'materialFolder' | 'expertise' | 'portfolio' | 'advantage' | 'galleryItem' } | null>(null);

  const removeAdvantage = (idx: number) => {
    setDeleteTarget({ id: idx, type: 'advantage' });
    setShowDeleteConfirm(true);
  };

  const removeMaterialTag = (name: string) => {
    setDeleteTarget({ name, type: 'materialTag' });
    setShowDeleteConfirm(true);
  };

  const removeMaterialItem = (id: number, name?: string) => {
    setDeleteTarget({ id, type: 'materialItem', name });
    setShowDeleteConfirm(true);
  };

  const removeSelectedMaterials = () => {
    if (selectedMaterials.length === 0) return;
    const names = selectedMaterials.map(m => m.name).join(', ');
    setDeleteTarget({ ids: selectedMaterials.map(m => m.id), type: 'materialItems', name: names });
    setShowDeleteConfirm(true);
  };

  const removeFolder = (folderName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteTarget({ folder: folderName, type: 'materialFolder' });
    setShowDeleteConfirm(true);
  };

  const removeExpertise = (id: number, title: string) => {
    setDeleteTarget({ id, name: title, type: 'expertise' });
    setShowDeleteConfirm(true);
  };

  const removeGalleryItem = (id: number, title: string) => {
    setDeleteTarget({ id, name: title, type: 'galleryItem' as any });
    setShowDeleteConfirm(true);
  };

  const addGalleryItem = () => {
    const newItem = {
      id: Date.now(),
      title: "新艺术项",
      img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231a1a2e'/%3E%3Cstop offset='100%25' style='stop-color:%2316213e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='800' height='600'/%3E%3C/svg%3E",
      type: "image",
      tag: "NEW ART"
    };
    setGalleryItems([...(galleryItems || []), newItem]);
  };
  const [isEditingHero, setIsEditingHero] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any>(null);

  // Editable content states
  const [heroTitle, setHeroTitle] = useState("PORTFOLIO");
  const [heroSub, setHeroSub] = useState("曾紫钰 · UX设计师");
  const [heroDesc, setHeroDesc] = useState("专注UI交互设计、擅长3D建模、动效设计与AI创作。<br class=\"hidden md:block\" />\n热爱探索设计与技术的无限可能。");
  const [aboutTitle, setAboutTitle] = useState("自我介绍");
  const [experienceTitle, setExperienceTitle] = useState("工作经历");
  const [projectsTitle, setProjectsTitle] = useState("项目展示");
  const [videosTitle, setVideosTitle] = useState("AI 创意画廊");
  const [videosDesc, setVideosDesc] = useState("探索人工智能生成的视觉艺术，体验未来创作的无限可能");
  const [expertiseTitle, setExpertiseTitle] = useState("我的专长");
  const [contactTitle, setContactTitle] = useState("社交联系");
  const [infoAge, setInfoAge] = useState("23岁");
  const [infoDegree, setInfoDegree] = useState("本科");
  const [infoMajor, setInfoMajor] = useState("数字媒体艺术");
  const [infoPhone, setInfoPhone] = useState("18373296050");
  const [infoEmail, setInfoEmail] = useState("2944905483@qq.com");
  const [profileImage, setProfileImage] = useState("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231a1a2e'/%3E%3Cstop offset='100%25' style='stop-color:%2316213e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='800' height='600'/%3E%3C/svg%3E");
  const [galleryItems, setGalleryItems] = useState(GALLERY_ITEMS);
  const [portfolioItems, setPortfolioItems] = useState(PORTFOLIO_ITEMS);
  const [editingPortfolio, setEditingPortfolio] = useState<any>(null);

  const handleUpdatePortfolio = (updatedItem: any) => {
    const currentItems = portfolioItems || [];
    let newItems;
    if (currentItems.some(i => i.id === updatedItem.id)) {
      // Update existing item
      newItems = currentItems.map(item => item.id === updatedItem.id ? updatedItem : item);
    } else {
      // Add new item
      newItems = [...currentItems, updatedItem];
    }
    // Sort: featured items first
    newItems.sort((a, b) => {
      if (a.isFeature && !b.isFeature) return -1;
      if (!a.isFeature && b.isFeature) return 1;
      return 0;
    });
    setPortfolioItems(newItems);
    setEditingPortfolio(null);
  };

  const removePortfolio = (id: number, title: string) => {
    setDeleteTarget({ id, name: title, type: 'portfolio' as any });
    setShowDeleteConfirm(true);
  };
  const [socials, setSocials] = useState(INITIAL_SOCIALS);
  const [showMaterialLibrary, setShowMaterialLibrary] = useState(false);
  const [materialSelectionCallback, setMaterialSelectionCallback] = useState<(material: any) => void>(() => {});
  const [materialBatchCallback, setMaterialBatchCallback] = useState<((materials: any[]) => void) | null>(null);
  const [materials, setMaterials] = useState<any[]>([
    { id: 1, name: '示例图片1', url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%234F46E5"/%3E%3Cstop offset="100%25" style="stop-color:%237C3AED"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23g)" width="400" height="400"/%3E%3Ctext fill="white" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E示例图片1%3C/text%3E%3C/svg%3E', type: 'image', category: '其他', size: '0.1 MB', date: '5月 14日 10:30' },
    { id: 2, name: '示例图片2', url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23EC4899"/%3E%3Cstop offset="100%25" style="stop-color:%23F43F5E"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23g)" width="400" height="400"/%3E%3Ctext fill="white" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E示例图片2%3C/text%3E%3C/svg%3E', type: 'image', category: '其他', size: '0.1 MB', date: '5月 14日 10:30' },
    { id: 3, name: '示例图片3', url: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Cdefs%3E%3ClinearGradient id="g" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%2310B981"/%3E%3Cstop offset="100%25" style="stop-color:%23059669"/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23g)" width="400" height="400"/%3E%3Ctext fill="white" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E示例图片3%3C/text%3E%3C/svg%3E', type: 'image', category: '其他', size: '0.1 MB', date: '5月 14日 10:30' },
  ]);
  const [libraryFolder, setLibraryFolder] = useState<string | null>(null);
  const [libraryCategory, setLibraryCategory] = useState("全部");
  const [libraryView, setLibraryView] = useState<'grid' | 'list'>('grid');
  const [selectedMaterials, setSelectedMaterials] = useState<any[]>([]);
  const [expertiseItems, setExpertiseItems] = useState(INITIAL_EXPERTISE_ITEMS);
  const [advantages, setAdvantages] = useState([
    "拥有 6 年 UI/UX 设计经验，覆盖 AI、电商与 IoT 等行业场景，能够快速理解业务需求并转化为清晰有效的体验方案。",
    "具备 App / Web / B 端后台多端设计经验，可独立完成需求分析、方案输出与设计落地。",
    "熟悉组件库、设计规范与 Figma 变量管理，能够提升设计复用效率与终端一致性，结合 AI 工具优化设计流程与协作效率。",
    "熟悉 AI 工具类与业务型产品设计，具备跨产品、研发协同推进能力。"
  ]);
  const [showResume, setShowResume] = useState(false);
  const [editingExpertise, setEditingExpertise] = useState<any>(null);
  const [editingTool, setEditingTool] = useState<any>(null);
  const [materialCategories, setMaterialCategories] = useState(["人物", "家具", "摆件", "风格", "生活", "箱包", "3C", "视频", "其他", "工作流"]);
  const [isDraggingOverLibrary, setIsDraggingOverLibrary] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const folderInputRef = React.useRef<HTMLInputElement>(null);

  const processFiles = async (files: FileList | File[], folderNameOverride?: string) => {
    const formData = new FormData();
    Array.from(files).forEach((file, index) => {
      formData.append('files', file);
      const relativePath = (file as any).webkitRelativePath || file.name;
      formData.append(`paths[${index}]`, relativePath);
    });

    console.log("Starting upload to:", window.location.origin + '/api/upload');
    console.log("Files count:", files.length);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        mode: 'cors'
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Server error response:", errText);
        let errMsg = `Server returned ${response.status}`;
        try {
          const errJson = JSON.parse(errText);
          if (errJson.error) errMsg = errJson.error;
        } catch(e) {}
        throw new Error(errMsg);
      }

      const uploadedMaterials = await response.json();
      console.log("Upload response data:", uploadedMaterials);
      
      // Determine folder name from webkitRelativePath if available
      const firstFile = Array.from(files)[0] as any;
      let detectedFolderName: string | null = folderNameOverride || null;
      
      if (!detectedFolderName && firstFile?.webkitRelativePath) {
        const pathParts = firstFile.webkitRelativePath.split('/');
        if (pathParts.length > 1) {
          detectedFolderName = pathParts[0];
        }
      }
      
      const newMaterialsWithIds = uploadedMaterials.map((m: any, index: number) => ({
        ...m,
        id: Date.now() + index,
        category: libraryCategory === '全部' ? '其他' : libraryCategory,
        folder: detectedFolderName || libraryFolder
      }));

      setMaterials(prev => [...prev, ...newMaterialsWithIds]);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleLocalUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files: File[] = Array.from(e.target.files);
      console.log("Selected files:", files.length);
      files.forEach(file => {
        console.log("File:", file.name, "Path:", (file as any).webkitRelativePath);
      });
      processFiles(files);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (folderInputRef.current) folderInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOverLibrary(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOverLibrary(false);
  };

  const traverseFileTree = (item: any, path: string = ""): Promise<File[]> => {
    return new Promise((resolve) => {
      if (item.isFile) {
        item.file((file: File) => {
          Object.defineProperty(file, 'webkitRelativePath', {
            value: path ? path + "/" + file.name : file.name,
            writable: true
          });
          resolve([file]);
        });
      } else if (item.isDirectory) {
        const dirReader = item.createReader();
        const allFiles: File[] = [];
        const readEntries = () => {
          dirReader.readEntries(async (entries: any[]) => {
            if (entries.length > 0) {
              for (const entry of entries) {
                const files = await traverseFileTree(entry, path ? path + "/" + item.name : item.name);
                allFiles.push(...files);
              }
              readEntries();
            } else {
              resolve(allFiles);
            }
          });
        };
        readEntries();
      } else {
        resolve([]);
      }
    });
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOverLibrary(false);
    
    const items = e.dataTransfer.items;
    const hasDirectory = items && Array.from(items).some((item: DataTransferItem) => {
      const entry = item.webkitGetAsEntry();
      return entry?.isDirectory;
    });
    
    if (hasDirectory) {
      const filePromises: Promise<File[]>[] = [];
      
      for (const item of Array.from(items)) {
        const entry = (item as DataTransferItem).webkitGetAsEntry();
        if (entry) {
          if (entry.isDirectory) {
            filePromises.push(traverseFileTree(entry));
          } else if (entry.isFile) {
            filePromises.push(new Promise((resolve) => {
              (entry as FileSystemFileEntry).file((file: File) => {
                resolve([file]);
              });
            }));
          }
        }
      }
      
      const results = await Promise.all(filePromises);
      const allFiles: File[] = results.flat();
      console.log("Dropped directory files count:", allFiles.length);
      
      if (allFiles.length > 0) {
        processFiles(allFiles);
      }
    } else {
      const dataTransferFiles = e.dataTransfer.files;
      if (dataTransferFiles && dataTransferFiles.length > 0) {
        const files: File[] = Array.from(dataTransferFiles);
        console.log("Dropped files count:", files.length);
        processFiles(files);
      }
    }
  };
  const [showTagManagement, setShowTagManagement] = useState(false);
  const [editingTag, setEditingTag] = useState<{index: number, name: string} | null>(null);
  const [newTagName, setNewTagName] = useState("");

  const openMaterialLibrary = (onSelect: (material: any) => void, onBatchSelect?: (materials: any[]) => void) => {
    setMaterialSelectionCallback(() => onSelect);
    setMaterialBatchCallback(onBatchSelect || null);
    setShowMaterialLibrary(true);
  };

  const handleReset = () => {
    localStorage.clear();
    setExperiences(INITIAL_EXPERIENCES);
    setTools(INITIAL_TOOLS);
    setCategories(INITIAL_CATEGORIES);
    setHeroTitle("PORTFOLIO");
    setHeroSub("曾紫钰 · UX设计师");
    setHeroDesc("专注UI交互设计、擅长3D建模、动效设计与AI创作。<br class=\"hidden md:block\" />\n热爱探索设计与技术的无限可能。");
    setExperienceTitle("工作经历");
    setProjectsTitle("项目展示");
    setVideosTitle("AI 创意画廊");
    setVideosDesc("探索人工智能生成的视觉艺术，体验未来创作的无限可能");
    setExpertiseTitle("我的专长");
    setContactTitle("社交联系");
    setAboutTitle("自我介绍");
    setInfoAge("23岁");
    setInfoDegree("本科");
    setInfoMajor("数字媒体艺术");
    setInfoPhone("18373296050");
    setInfoEmail("2944905483@qq.com");
    setProfileImage("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231a1a2e'/%3E%3Cstop offset='100%25' style='stop-color:%2316213e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='800' height='600'/%3E%3C/svg%3E");
    setGalleryItems(GALLERY_ITEMS);
    setPortfolioItems(PORTFOLIO_ITEMS);
    setSocials(INITIAL_SOCIALS);
    setExpertiseItems(INITIAL_EXPERTISE_ITEMS);
    setMaterialCategories(["人物", "家具", "摆件", "风格", "生活", "箱包", "3C", "视频", "其他", "工作流"]);
    setMaterials([]);
    setShowResetConfirm(false);
    
    // Feedback
    const btn = document.getElementById('save-status');
    if (btn) {
      btn.innerText = '已重置';
      setTimeout(() => btn.innerText = '管理员模式', 2000);
    }
  };

  const addTool = () => {
    const newTool = {
      id: Date.now(),
      name: "新技能",
      iconName: "Sparkles",
      color: "text-blue-400"
    };
    setEditingTool(newTool);
  };

  const removeTool = (id: number) => {
    setDeleteTarget({ id, type: 'tool' });
    setShowDeleteConfirm(true);
  };

  const handleUpdateTool = (updatedTool: any) => {
    if (tools.some(t => t.id === updatedTool.id)) {
      setTools(tools.map(t => t.id === updatedTool.id ? updatedTool : t));
    } else {
      setTools([...tools, updatedTool]);
    }
    setEditingTool(null);
  };

  const addCategory = () => {
    setEditingCategory({ 
      oldName: "", 
      newName: "", 
      displayType: "A+" 
    });
    setShowCategoryEditModal(true);
  };

  const updateCategory = (oldName: string, newName: string, displayType?: string) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    
    // Check if name already exists (except when updating displayType of existing category)
    if (oldName !== trimmed && categories.some(c => c.name === trimmed)) {
      return;
    }
    
    if (!oldName) {
      // Add new category
      setCategories([...categories, { name: trimmed, displayType: displayType || "A+" }]);
    } else {
      // Update existing category
      setCategories(categories.map(c => 
        c.name === oldName 
          ? { ...c, name: trimmed, displayType: displayType || c.displayType } 
          : c
      ));
      if (activeCategory === oldName) {
        setActiveCategory(trimmed);
      }
    }
  };

  const removeCategory = (name: string) => {
    setDeleteTarget({ name, type: 'category' });
    setShowDeleteConfirm(true);
  };

  const handleCategoryDragStart = (e: React.DragEvent, categoryName: string) => {
    setDraggedCategory(categoryName);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleCategoryDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedCategory && dragOverCategory && draggedCategory !== dragOverCategory) {
      setCategories(prevCategories => {
        const newCategories = [...prevCategories];
        const draggedIndex = newCategories.findIndex(c => c.name === draggedCategory);
        const targetIndex = newCategories.findIndex(c => c.name === dragOverCategory);
        
        if (draggedIndex !== -1 && targetIndex !== -1) {
          const [draggedItem] = newCategories.splice(draggedIndex, 1);
          newCategories.splice(targetIndex, 0, draggedItem);
        }
        
        return newCategories;
      });
    }
    setDraggedCategory(null);
    setDragOverCategory(null);
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      company: "新增公司名称",
      role: "职位名称",
      period: "202X.XX - 202X.XX",
      description: ["点击此处编辑工作内容..."]
    };
    setExperiences([newExp, ...experiences]);
  };

  const removeExperience = (id: number) => {
    setDeleteTarget({ id, type: 'experience' });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    console.log("confirmDelete called, deleteTarget:", deleteTarget);
    if (!deleteTarget) {
      console.log("deleteTarget is null, returning");
      return;
    }
    console.log("deleteTarget type:", deleteTarget.type);
    
    if (deleteTarget.type === 'experience') {
      setExperiences(experiences.filter(e => e.id !== deleteTarget.id));
    } else if (deleteTarget.type === 'tool') {
      setTools(tools.filter(t => t.id !== deleteTarget.id));
    } else if (deleteTarget.type === 'category') {
      const name = deleteTarget.name;
      setCategories(categories.filter(c => c.name !== name));
      if (activeCategory === name) {
        setActiveCategory("全部");
      }
    } else if (deleteTarget.type === 'materialTag') {
        const name = deleteTarget.name;
        setMaterialCategories(materialCategories.filter(c => c !== name));
        if (libraryCategory === name) {
            setLibraryCategory("全部");
        }
    } else if (deleteTarget.type === 'materialItem') {
        const itemToDelete = materials.find(m => m.id === deleteTarget.id);
        if (itemToDelete?.dbKey) {
          try {
            const db = await openDB();
            await db.delete('materials', itemToDelete.dbKey);
          } catch (e) {
            console.error("Failed to delete from DB", e);
          }
        }
        
        if (itemToDelete?.url) {
          const fileName = itemToDelete.url.split('/').pop();
          if (fileName) {
            try {
              await fetch('/api/delete-file', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ filename: fileName })
              });
            } catch (e) {
              console.error("Failed to delete file from server", e);
            }
          }
        }
        
        setMaterials(materials.filter(m => m.id !== deleteTarget.id));
    } else if (deleteTarget.type === 'materialItems') {
        const idsToDelete = deleteTarget.ids || [];
        const itemsToDelete = materials.filter(m => idsToDelete.includes(m.id));
        
        try {
            const db = await openDB();
            for (const item of itemsToDelete) {
                if (item.dbKey) {
                    await db.delete('materials', item.dbKey);
                }
                
                if (item.url) {
                  const fileName = item.url.split('/').pop();
                  if (fileName) {
                    try {
                      await fetch('/api/delete-file', {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ filename: fileName })
                      });
                    } catch (e) {
                      console.error("Failed to delete file from server", e);
                    }
                  }
                }
            }
        } catch (e) {
            console.error("Failed to delete items", e);
        }
        
        setMaterials(materials.filter(m => !idsToDelete.includes(m.id)));
        setSelectedMaterials([]);
    } else if (deleteTarget.type === 'materialFolder') {
        const folderName = deleteTarget.folder;
        const itemsToDelete = materials.filter(m => m.folder === folderName);
        
        try {
            const db = await openDB();
            for (const item of itemsToDelete) {
                if (item.dbKey) {
                    await db.delete('materials', item.dbKey);
                }
                
                if (item.url) {
                  const fileName = item.url.split('/').pop();
                  if (fileName) {
                    try {
                      await fetch('/api/delete-file', {
                        method: 'DELETE',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ filename: fileName, folder: folderName })
                      });
                    } catch (e) {
                      console.error("Failed to delete file from server", e);
                    }
                  }
                }
            }
            
            try {
              await fetch('/api/delete-folder', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ folder: folderName })
              });
            } catch (e) {
              console.error("Failed to delete folder from server", e);
            }
        } catch (e) {
            console.error("Failed to delete folder", e);
        }
        
        setMaterials(materials.filter(m => m.folder !== folderName));
    } else if (deleteTarget.type === 'expertise') {
        setExpertiseItems(expertiseItems.filter(item => item.id !== deleteTarget.id));
    } else if (deleteTarget.type === 'portfolio') {
        setPortfolioItems(portfolioItems.filter(item => item.id !== deleteTarget.id));
    } else if (deleteTarget.type === 'galleryItem' as any) {
        setGalleryItems(galleryItems.filter(item => item.id !== deleteTarget.id));
    } else if (deleteTarget.type === 'advantage') {
        setAdvantages(advantages.filter((_, i) => i !== deleteTarget.id));
    }
    
    setShowDeleteConfirm(false);
    setDeleteTarget(null);
  };

  const handleUpdateExperience = (updatedExp: any) => {
    setExperiences(experiences.map(e => e.id === updatedExp.id ? updatedExp : e));
    setEditingExperience(null);
  };

  const handleUpdateExpertise = (updatedExpertise: any) => {
    if (expertiseItems.some(i => i.id === updatedExpertise.id)) {
      setExpertiseItems(expertiseItems.map(item => item.id === updatedExpertise.id ? updatedExpertise : item));
    } else {
      setExpertiseItems([...expertiseItems, updatedExpertise]);
    }
    setEditingExpertise(null);
  };

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === "980514") {
      setIsAdminMode(true);
      setShowAdminAuth(false);
      setAdminPassword("");
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setTimeout(() => setPasswordError(false), 2000);
    }
  };

  const filteredPortfolio = useMemo(() => {
    if (!portfolioItems || !Array.isArray(portfolioItems)) return [];
    return portfolioItems.filter(item => item && item.categories && Array.isArray(item.categories) && item.categories.includes(activeCategory));
  }, [activeCategory, portfolioItems]);

  const handleNextZoom = useCallback(() => {
    if (!zoomItem) return;

    // Handle project sub-images if a project is selected
    if (selectedProject && (
      zoomItem.id.toString().startsWith('pc-') || 
      zoomItem.id.toString().startsWith('mob-') || 
      zoomItem.id.toString().startsWith('w-')
    )) {
      const allSubItems = [
        ...(selectedProject.aPlusPCImages || []).map((img: string, i: number) => ({
          id: `pc-${selectedProject.id}-${i}`,
          title: `${selectedProject.title} - A+ PC`,
          image: img,
          tags: selectedProject.tags,
          type: 'image',
          displayType: zoomItem.displayType
        })),
        ...(selectedProject.aPlusMobileImages || []).map((img: string, i: number) => ({
          id: `mob-${selectedProject.id}-${i}`,
          title: `${selectedProject.title} - A+ Mobile`,
          image: img,
          tags: selectedProject.tags,
          type: 'image',
          displayType: zoomItem.displayType
        })),
        ...(selectedProject.walmartImages || []).map((img: string, i: number) => ({
          id: `w-${selectedProject.id}-${i}`,
          title: selectedProject.title,
          image: img,
          tags: selectedProject.tags,
          type: 'image',
          displayType: zoomItem.displayType
        }))
      ];

      if (allSubItems.length > 0) {
        const currentIndex = allSubItems.findIndex(item => item.id === zoomItem.id);
        const nextIndex = (currentIndex + 1) % allSubItems.length;
        setZoomItem(allSubItems[nextIndex]);
        return;
      }
    }

    const currentIndex = filteredPortfolio.findIndex(item => item.id === zoomItem.id);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % filteredPortfolio.length;
      const nextItem = filteredPortfolio[nextIndex];
      setZoomItem({ ...nextItem, displayType: zoomItem.displayType });
    }
  }, [zoomItem, filteredPortfolio, selectedProject]);

  const handlePrevZoom = useCallback(() => {
    if (!zoomItem) return;

    // Handle project sub-images if a project is selected
    if (selectedProject && (
      zoomItem.id.toString().startsWith('pc-') || 
      zoomItem.id.toString().startsWith('mob-') || 
      zoomItem.id.toString().startsWith('w-')
    )) {
      const allSubItems = [
        ...(selectedProject.aPlusPCImages || []).map((img: string, i: number) => ({
          id: `pc-${selectedProject.id}-${i}`,
          title: `${selectedProject.title} - A+ PC`,
          image: img,
          tags: selectedProject.tags,
          type: 'image',
          displayType: zoomItem.displayType
        })),
        ...(selectedProject.aPlusMobileImages || []).map((img: string, i: number) => ({
          id: `mob-${selectedProject.id}-${i}`,
          title: `${selectedProject.title} - A+ Mobile`,
          image: img,
          tags: selectedProject.tags,
          type: 'image',
          displayType: zoomItem.displayType
        })),
        ...(selectedProject.walmartImages || []).map((img: string, i: number) => ({
          id: `w-${selectedProject.id}-${i}`,
          title: selectedProject.title,
          image: img,
          tags: selectedProject.tags,
          type: 'image',
          displayType: zoomItem.displayType
        }))
      ];

      if (allSubItems.length > 0) {
        const currentIndex = allSubItems.findIndex(item => item.id === zoomItem.id);
        const prevIndex = (currentIndex - 1 + allSubItems.length) % allSubItems.length;
        setZoomItem(allSubItems[prevIndex]);
        return;
      }
    }

    const currentIndex = filteredPortfolio.findIndex(item => item.id === zoomItem.id);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + filteredPortfolio.length) % filteredPortfolio.length;
      const prevItem = filteredPortfolio[prevIndex];
      setZoomItem({ ...prevItem, displayType: zoomItem.displayType });
    }
  }, [zoomItem, filteredPortfolio, selectedProject]);

  const handleNextProject = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = filteredPortfolio.findIndex(item => item.id === selectedProject.id);
    if (currentIndex !== -1) {
      if (currentIndex < filteredPortfolio.length - 1) {
        setSelectedProject(filteredPortfolio[currentIndex + 1]);
      } else {
        setSelectedProject(filteredPortfolio[0]);
      }
      if (modalScrollRef.current) modalScrollRef.current.scrollTop = 0;
    }
  }, [selectedProject, filteredPortfolio]);

  const handlePrevProject = useCallback(() => {
    if (!selectedProject) return;
    const currentIndex = filteredPortfolio.findIndex(item => item.id === selectedProject.id);
    if (currentIndex !== -1) {
      if (currentIndex > 0) {
        setSelectedProject(filteredPortfolio[currentIndex - 1]);
      } else {
        setSelectedProject(filteredPortfolio[filteredPortfolio.length - 1]);
      }
      if (modalScrollRef.current) modalScrollRef.current.scrollTop = 0;
    }
  }, [selectedProject, filteredPortfolio]);

  const handleNextGallery = useCallback(() => {
    if (!selectedGalleryItem || !galleryItems) return;
    const currentIndex = galleryItems.findIndex(item => item.id === selectedGalleryItem.id);
    if (currentIndex >= 0 && currentIndex < galleryItems.length - 1) {
      setSelectedGalleryItem(galleryItems[currentIndex + 1]);
    } else if (currentIndex >= 0 && galleryItems.length > 0) {
      setSelectedGalleryItem(galleryItems[0]);
    }
  }, [selectedGalleryItem, galleryItems]);

  const handlePrevGallery = useCallback(() => {
    if (!selectedGalleryItem || !galleryItems) return;
    const currentIndex = galleryItems.findIndex(item => item.id === selectedGalleryItem.id);
    if (currentIndex > 0) {
      setSelectedGalleryItem(galleryItems[currentIndex - 1]);
    } else if (currentIndex >= 0 && galleryItems.length > 0) {
      setSelectedGalleryItem(galleryItems[galleryItems.length - 1]);
    }
  }, [selectedGalleryItem, galleryItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (zoomItem) {
        if (e.key === "ArrowRight") handleNextZoom();
        if (e.key === "ArrowLeft") handlePrevZoom();
        if (e.key === "Escape") setZoomItem(null);
      } else if (selectedProject) {
        if (e.key === "ArrowRight") handleNextProject();
        if (e.key === "ArrowLeft") handlePrevProject();
        if (e.key === "Escape") setSelectedProject(null);
      } else if (selectedGalleryItem) {
        if (e.key === "ArrowRight") handleNextGallery();
        if (e.key === "ArrowLeft") handlePrevGallery();
        if (e.key === "Escape") setSelectedGalleryItem(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomItem, handleNextZoom, handlePrevZoom, selectedProject, handleNextProject, handlePrevProject, selectedGalleryItem, handleNextGallery, handlePrevGallery]);

  const nextSlide = () => setActiveIdx((prev) => (prev + 1) % (galleryItems?.length || 1));
  const prevSlide = () => setActiveIdx((prev) => (prev - 1 + (galleryItems?.length || 1)) % (galleryItems?.length || 1));

  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  
  useEffect(() => {
    if (isCarouselHovered) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isCarouselHovered, galleryItems?.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    
    const abortController = new AbortController();
    
    // Load all data from server and fallback to localStorage
    const loadData = async () => {
      try {
        const response = await fetch('/api/config');
        const config = await response.json();
        
        if (config && Object.keys(config).length > 0) {
          if (config.heroTitle) setHeroTitle(config.heroTitle);
          if (config.heroSub) setHeroSub(config.heroSub);
          if (config.heroDesc) setHeroDesc(config.heroDesc);
          if (config.aboutTitle) setAboutTitle(config.aboutTitle);
          if (config.experienceTitle) setExperienceTitle(config.experienceTitle);
          if (config.projectsTitle) setProjectsTitle(config.projectsTitle);
          if (config.videosTitle) setVideosTitle(config.videosTitle);
          if (config.videosDesc) setVideosDesc(config.videosDesc);
          if (config.expertiseTitle) setExpertiseTitle(config.expertiseTitle);
          if (config.contactTitle) setContactTitle(config.contactTitle);
          if (config.infoAge) setInfoAge(config.infoAge);
          if (config.infoDegree) setInfoDegree(config.infoDegree);
          if (config.infoMajor) setInfoMajor(config.infoMajor);
          if (config.infoPhone) setInfoPhone(config.infoPhone);
          if (config.infoEmail) setInfoEmail(config.infoEmail);
          if (config.profileImage) setProfileImage(config.profileImage);
          if (config.experiences) setExperiences(config.experiences);
          if (config.expertiseItems) setExpertiseItems(config.expertiseItems);
          if (config.categories) setCategories(config.categories);
          if (config.socials) setSocials(config.socials);
          if (config.tools) setTools(config.tools);
          if (config.advantages) setAdvantages(config.advantages);
          if (config.materials) setMaterials(config.materials);
          if (config.materialCategories) setMaterialCategories(config.materialCategories);
          if (config.portfolioItems) setPortfolioItems(config.portfolioItems);
          if (config.galleryItems) setGalleryItems(config.galleryItems);
          return; // Server loaded, skip fallback
        }
      } catch (err: any) {
        console.log("Server config not available, using fallback");
      }

      // Fallback: Original localStorage logic
      const db = await openDB();
      const savedMeta = localStorage.getItem('material_metadata');
      if (savedMeta) {
        try {
          const meta = JSON.parse(savedMeta);
          const refreshedMaterials = await Promise.all((meta || []).map(async (item: any) => {
            if (item.dbKey && !item.url.startsWith('/uploads/')) {
              const blob = await db.get('materials', item.dbKey);
              if (blob) return { ...item, url: URL.createObjectURL(blob) };
            }
            return item;
          }));
          setMaterials(refreshedMaterials.filter(m => m.url));
        } catch (e) { console.error("Failed to load materials", e); }
      }

      // 2. Load Gallery & Portfolio fallback
      const savedGallery = localStorage.getItem('cv_gallery_items');
      if (savedGallery) {
        try {
          const items = JSON.parse(savedGallery);
          const refreshed = await Promise.all((items || []).map(async (item: any) => {
            if (item.dbKey && !item.img.startsWith('/uploads/')) {
              const blob = await db.get('materials', item.dbKey);
              if (blob) return { ...item, img: URL.createObjectURL(blob) };
            }
            return item;
          }));
          setGalleryItems(refreshed);
        } catch (e) { console.error(e); }
      }

      const savedPortfolio = localStorage.getItem('cv_portfolio_items');
      if (savedPortfolio) {
        try {
          const items = JSON.parse(savedPortfolio);
          const refreshed = await Promise.all((items || []).map(async (item: any) => {
            if (item.dbKey && !item.image.startsWith('/uploads/')) {
              const blob = await db.get('materials', item.dbKey);
              if (blob) return { ...item, image: URL.createObjectURL(blob) };
            }
            return item;
          }));
          setPortfolioItems(refreshed);
        } catch (e) { console.error(e); }
      }
      
      const savedConfig = localStorage.getItem('cv_config');
      if (savedConfig) {
        try {
          const config = JSON.parse(savedConfig);
          if (config.heroTitle) setHeroTitle(config.heroTitle);
          if (config.heroSub) setHeroSub(config.heroSub);
          if (config.heroDesc) setHeroDesc(config.heroDesc);
          if (config.aboutTitle) setAboutTitle(config.aboutTitle);
          if (config.experienceTitle) setExperienceTitle(config.experienceTitle);
          if (config.projectsTitle) setProjectsTitle(config.projectsTitle);
          if (config.videosTitle) setVideosTitle(config.videosTitle);
          if (config.videosDesc) setVideosDesc(config.videosDesc);
          if (config.expertiseTitle) setExpertiseTitle(config.expertiseTitle);
          if (config.contactTitle) setContactTitle(config.contactTitle);
          if (config.infoAge) setInfoAge(config.infoAge);
          if (config.infoDegree) setInfoDegree(config.infoDegree);
          if (config.infoMajor) setInfoMajor(config.infoMajor);
          if (config.infoPhone) setInfoPhone(config.infoPhone);
          if (config.infoEmail) setInfoEmail(config.infoEmail);
          if (config.profileImage) setProfileImage(config.profileImage);
          if (config.experiences) setExperiences(config.experiences);
          if (config.expertiseItems) setExpertiseItems(config.expertiseItems);
          if (config.categories) setCategories(config.categories);
          if (config.socials) setSocials(config.socials);
          if (config.tools) setTools(config.tools);
          if (config.advantages) setAdvantages(config.advantages);
        } catch (e) { console.error("Failed to load CV config", e); }
      }
      
      const savedLibraryCategories = localStorage.getItem('material_categories');
      if (savedLibraryCategories) {
        try {
          const parsed = JSON.parse(savedLibraryCategories);
          if (Array.isArray(parsed)) setMaterialCategories(parsed);
        } catch (e) { console.error("Failed to parse material_categories", e); }
      }
    };
    
    loadData();
    
    return () => {
      abortController.abort();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleModalScroll = () => {
      if (modalScrollRef.current) {
        setShowModalBackToTop(modalScrollRef.current.scrollTop > 300);
        setModalIsScrolled(modalScrollRef.current.scrollTop > 50);
      }
    };

    const modalScrollEl = modalScrollRef.current;
    if (modalScrollEl) {
      modalScrollEl.addEventListener("scroll", handleModalScroll);
      handleModalScroll();
      return () => {
        modalScrollEl.removeEventListener("scroll", handleModalScroll);
      };
    }
  }, [selectedProject]);

  // Sync state to server and localStorage
  useEffect(() => {
    const config = {
      heroTitle, heroSub, heroDesc,
      aboutTitle, experienceTitle, projectsTitle, videosTitle, videosDesc, expertiseTitle, contactTitle,
      infoAge, infoDegree, infoMajor, infoPhone, infoEmail,
      profileImage, experiences, expertiseItems, tools, categories, socials,
      materials, materialCategories, portfolioItems, galleryItems,
      advantages
    };
    
    // Still keep localStorage for instant responsiveness
    localStorage.setItem('cv_config', JSON.stringify(config));
    localStorage.setItem('material_metadata', JSON.stringify(materials || []));
    localStorage.setItem('cv_gallery_items', JSON.stringify((galleryItems || []).map(i => ({ ...i, img: i.dbKey ? '' : i.img }))));
    localStorage.setItem('cv_portfolio_items', JSON.stringify((portfolioItems || []).map(i => ({ ...i, image: i.dbKey ? '' : i.image }))));
    localStorage.setItem('material_categories', JSON.stringify(materialCategories || []));

    let cancelled = false;
    const timeoutId = setTimeout(async () => {
      try {
        await fetch('/api/config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(config)
        });
      } catch (err: any) {
        if (!cancelled) {
          console.log("Sync to server not available");
        }
      }
    }, 500);
    
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [
    heroTitle, heroSub, heroDesc, aboutTitle, experienceTitle, projectsTitle, 
    videosTitle, videosDesc, expertiseTitle, contactTitle,
    infoAge, infoDegree, infoMajor, infoPhone, infoEmail,
    profileImage, experiences, expertiseItems, tools, categories, portfolioItems, socials,
    materials, materialCategories, galleryItems, advantages
  ]);

  // IndexedDB simple wrapper (using raw IDB)
  const openDB = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('MaterialLibraryDB', 1);
      request.onupgradeneeded = () => {
        request.result.createObjectStore('materials');
      };
      request.onsuccess = () => {
        const db = request.result;
        resolve({
          put: (storeName: string, value: any, key: string) => {
            return new Promise((res, rej) => {
              const tx = db.transaction(storeName, 'readwrite');
              tx.objectStore(storeName).put(value, key);
              tx.oncomplete = () => res(true);
              tx.onerror = () => rej(tx.error);
            });
          },
          get: (storeName: string, key: string) => {
            return new Promise((res, rej) => {
              const tx = db.transaction(storeName, 'readonly');
              const req = tx.objectStore(storeName).get(key);
              req.onsuccess = () => res(req.result);
              req.onerror = () => rej(tx.error);
            });
          },
          delete: (storeName: string, key: string) => {
            return new Promise((res, rej) => {
              const tx = db.transaction(storeName, 'readwrite');
              const req = tx.objectStore(storeName).delete(key);
              req.onsuccess = () => res(true);
              req.onerror = () => rej(tx.error);
            });
          }
        });
      };
      request.onerror = () => reject(request.error);
    });
  };

  const scrollToTop = () => {
    if (selectedProject) {
      // For modal: first try using the ref directly (most reliable)
      if (modalScrollRef.current) {
        modalScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      // Fallback: try to find the scroll container inside the modal
      const modalContainer = document.querySelector('[class*="bg-[#0a0a14]/98"]');
      if (modalContainer) {
        const modalScrollEl = modalContainer.querySelector('.overflow-y-auto');
        if (modalScrollEl) {
          modalScrollEl.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }
      // Fallback: try to find any scrollable container with scrollbar-hide class
      const scrollEl = document.querySelector('.overflow-y-auto.scrollbar-hide');
      if (scrollEl) {
        scrollEl.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
    // For main page: scroll window
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const shouldShowBackToTop = selectedProject 
    ? showModalBackToTop 
    : isScrolled;

  if (showResume) {
    const nameMatch = heroSub.match(/^([^\s·]+)/);
    const roleMatch = heroSub.match(/·\s*(.+)$/);
    
    return (
      <ResumePage 
        onBack={() => setShowResume(false)}
        data={{
          name: nameMatch ? nameMatch[1] : "曾紫钰",
          role: roleMatch ? roleMatch[1] : "UX设计师",
          experienceYears: infoAge.replace(/[^0-9]/g, '') === '23' ? '6' : infoAge.replace(/[^0-9]/g, ''), // Default 6 based on reference
          age: infoAge,
          degree: infoDegree,
          major: infoMajor,
          phone: infoPhone,
          email: infoEmail,
          profileImage,
          advantages,
          experiences,
          tools
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      <EnhancedBackground />
      <ParticleBackground />
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-500 px-6 py-6 md:px-12 ${
          isScrolled ? "bg-black/40 backdrop-blur-xl py-4" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-black tracking-[0.1em] uppercase"
          >
            PORTFOLIO
          </motion.div>
          
          <div className="hidden md:flex gap-12 text-[13px] font-medium tracking-widest text-gray-400 items-center">
            {[["首页", "home"], ["自我介绍", "about"], ["创意画廊", "videos"], ["精选作品", "portfolio"], ["我的专长", "expertise"]].map(([label, id], idx) => (
              <motion.a
                key={id}
                href={`#${id}`}
                className="hover:text-white transition-colors uppercase tracking-[0.15em]"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
              >
                {label}
              </motion.a>
            ))}
            <motion.button
              onClick={() => isAdminMode ? setIsAdminMode(false) : setShowAdminAuth(true)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 rounded-lg ml-4"
            >
              {isAdminMode ? <LockOpen className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex flex-col items-center justify-center bg-transparent">
        {/* Video Background */}
        <VideoHero />
        {/* Content Container */}
        <motion.div 
          variants={STAGGER_CHILDREN}
          initial="initial"
          animate="animate"
          className="text-center z-10 px-6 w-full max-w-[1600px] relative"
        >
          {isAdminMode && (
            <div className="absolute -top-24 right-6 flex justify-end w-full mb-8 pointer-events-auto">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setIsEditingHero(!isEditingHero)}
                className="flex items-center gap-2 px-6 py-2.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full hover:bg-black/60 transition-all group shadow-2xl"
              >
                {isEditingHero ? (
                  <>
                    <Save className="w-4 h-4 text-blue-400" />
                    <span className="text-[12px] text-white font-medium tracking-wider">保存修改</span>
                  </>
                ) : (
                  <>
                    <Pencil className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    <span className="text-[12px] text-gray-300 font-medium tracking-wider">编辑首屏文案</span>
                  </>
                )}
              </motion.button>
            </div>
          )}

          {/* Main Large Heading */}
          <motion.h1 
            variants={FADE_UP}
            contentEditable={isEditingHero}
            suppressContentEditableWarning
            onBlur={(e) => setHeroTitle(e.currentTarget.innerText)}
            className={`text-[11vw] md:text-[9vw] font-black font-display tracking-[-0.05em] leading-[0.9] text-white select-none opacity-[0.98] drop-shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-500 ${
              isEditingHero 
                ? 'bg-white/[0.03] border border-white/10 rounded-2xl px-10 py-6 mb-20 cursor-text shadow-2xl' 
                : 'mb-20'
            }`}
          >
            {heroTitle}
          </motion.h1>

          {/* Subheading (Name) */}
          <motion.h2 
            variants={FADE_UP}
            contentEditable={isEditingHero}
            suppressContentEditableWarning
            onBlur={(e) => setHeroSub(e.currentTarget.innerText)}
            className={`text-3xl md:text-5xl font-bold tracking-tight text-white/90 transition-all duration-500 mx-auto max-w-fit ${
              isEditingHero 
                ? 'bg-white/[0.03] border border-white/10 rounded-xl px-8 py-2 mb-10 cursor-text shadow-xl' 
                : 'mb-6'
            }`}
          >
            {heroSub}
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            variants={FADE_UP}
            contentEditable={isEditingHero}
            suppressContentEditableWarning
            onBlur={(e) => setHeroDesc(e.currentTarget.innerHTML)}
            className={`text-gray-400 text-base md:text-xl font-light mx-auto leading-relaxed tracking-[0.12em] transition-all duration-500 max-w-3xl ${
              isEditingHero 
                ? 'bg-white/[0.03] border border-white/10 rounded-xl px-8 py-3 mb-20 cursor-text shadow-xl' 
                : 'mb-16'
            }`}
            dangerouslySetInnerHTML={{ __html: heroDesc }}
          />

          <motion.div variants={FADE_UP} className="flex flex-wrap justify-center gap-6">
            <motion.a 
              href="#about" 
              onMouseEnter={() => setActiveHeroButton(false)}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-12 py-3.5 rounded-full font-bold text-xs tracking-[0.25em] min-w-[150px] cursor-pointer uppercase flex items-center justify-center transition-all duration-300 ${
                !activeHeroButton
                  ? 'bg-white text-black'
                  : 'bg-white/10 border border-white/20 text-white backdrop-blur-xl'
              }`}
              whileHover={{ scale: 1.05, boxShadow: !activeHeroButton ? '0 20px 40px rgba(255,255,255,0.3)' : 'none' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              了解我
            </motion.a>
            <motion.a 
              href="#videos" 
              onMouseEnter={() => setActiveHeroButton(true)}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('videos')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-12 py-3.5 rounded-full font-bold text-xs tracking-[0.25em] min-w-[150px] cursor-pointer uppercase flex items-center justify-center transition-all duration-300 ${
                activeHeroButton
                  ? 'bg-white text-black'
                  : 'bg-white/10 border border-white/20 text-white backdrop-blur-xl'
              }`}
              whileHover={{ scale: 1.05, boxShadow: activeHeroButton ? '0 20px 40px rgba(255,255,255,0.3)' : 'none' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              查看作品
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Ambient Lighting & Horizon Line is now in EnhancedBackground */}

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0], y: [0, 12, 0] }}
          transition={{ 
            initial: { delay: 1.5, duration: 1 },
            opacity: { repeat: Infinity, duration: 2.5, times: [0, 0.2, 0.8, 1] },
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 z-20 pointer-events-none"
        >
          <ChevronDown className="w-7 h-7 stroke-[2.5px]" />
        </motion.div>
      </section>

      {/* Intro / About Me Section */}
      <section id="about" className="py-24 px-6 md:px-12 relative">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-24">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-blue-500 text-sm font-bold tracking-[0.4em] uppercase mb-4 block"
            >
              关于我
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              contentEditable={isAdminMode}
              suppressContentEditableWarning
              onBlur={(e) => setAboutTitle(e.currentTarget.innerText)}
              className={`text-5xl md:text-7xl font-bold font-display tracking-tight transition-all duration-500 text-center ${
                isAdminMode 
                  ? 'bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-12 cursor-text' 
                  : ''
              }`}
            >
              {aboutTitle}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Column: Profile Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 space-y-8"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative h-full bg-[#0D0D0E] rounded-[2.5rem] overflow-hidden border border-white/5 p-6 flex flex-col min-h-[900px]">
                  {/* Profile Header */}
                  <div className="w-full aspect-[3/4] rounded-[2rem] overflow-hidden bg-neutral-900 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.15)] mb-10 shrink-0 relative group/img">
                    {profileImage.endsWith('.mp4') || profileImage.includes('video') ? (
                      <video 
                        src={profileImage} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                    ) : (
                      <img 
                        src={profileImage} 
                        alt="Profile"
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                    )}
                    {isAdminMode && (
                      <div 
                        onClick={() => {
                          openMaterialLibrary((material) => setProfileImage(material.url));
                        }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer opacity-100 transition-opacity duration-300 z-30"
                      >
                        <ImageIcon className="w-8 h-8 text-white mb-2" />
                        <span className="text-white text-sm font-medium">更换图片</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6 shrink-0">
                    <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2">
                        <User className="w-3 h-3" /> 年龄
                      </div>
                      <div 
                        contentEditable={isAdminMode} 
                        suppressContentEditableWarning 
                        onBlur={(e) => setInfoAge(e.currentTarget.innerText)}
                        className={`text-2xl font-bold transition-all px-2 ${isAdminMode ? 'bg-white/5 border border-white/10 rounded-xl cursor-text' : ''}`}
                      >{infoAge}</div>
                    </div>
                    <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2">
                        <GraduationCap className="w-3 h-3" /> 学历
                      </div>
                      <div 
                        contentEditable={isAdminMode} 
                        suppressContentEditableWarning 
                        onBlur={(e) => setInfoDegree(e.currentTarget.innerText)}
                        className={`text-2xl font-bold transition-all px-2 ${isAdminMode ? 'bg-white/5 border border-white/10 rounded-xl cursor-text' : ''}`}
                      >{infoDegree}</div>
                    </div>
                  </div>

                  <div className="bg-white/[0.03] rounded-2xl p-5 border border-white/5 mb-8 shrink-0 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-[0.2em] mb-2">
                      专业
                    </div>
                    <div 
                      contentEditable={isAdminMode} 
                      suppressContentEditableWarning 
                      onBlur={(e) => setInfoMajor(e.currentTarget.innerText)}
                      className={`text-2xl font-bold transition-all px-2 ${isAdminMode ? 'bg-white/5 border border-white/10 rounded-xl cursor-text py-1' : ''}`}
                    >{infoMajor}</div>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

                  {/* Contact Info */}
                  <div className="space-y-4 mb-10 shrink-0">
                    <div className="flex items-center gap-5 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                      <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-500/20">
                        <Phone className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-medium mb-0.5">联系电话</div>
                        <div 
                          contentEditable={isAdminMode} 
                          suppressContentEditableWarning 
                          onBlur={(e) => setInfoPhone(e.currentTarget.innerText)}
                          className={`font-bold text-lg transition-all ${isAdminMode ? 'bg-white/5 border border-white/10 rounded-xl cursor-text px-2' : ''}`}
                        >{infoPhone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                      <div className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center border border-purple-500/20">
                        <Mail className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-medium mb-0.5">邮箱地址</div>
                        <div 
                          contentEditable={isAdminMode} 
                          suppressContentEditableWarning 
                          onBlur={(e) => setInfoEmail(e.currentTarget.innerText)}
                          className={`font-bold text-lg transition-all ${isAdminMode ? 'bg-white/5 border border-white/10 rounded-xl cursor-text px-2' : ''}`}
                        >{infoEmail}</div>
                      </div>
                    </div>
                  </div>

                  {/* Skills Tools */}
                  <div className="mb-12">
                    <div className="text-[12px] text-white font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      常用工具
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {tools.map((skill) => (
                        <div 
                          key={skill.id} 
                          className="relative group/skill"
                        >
                          <span 
                            contentEditable={isAdminMode}
                            suppressContentEditableWarning
                            className="px-4 py-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-[12px] text-gray-400 font-medium hover:border-blue-500/40 hover:bg-white/[0.06] hover:text-white transition-all flex items-center gap-2.5"
                          >
                            <div className={`flex items-center justify-center transition-transform duration-300 ${skill.color || ''}`}>
                              <IconRenderer name={skill.iconName} className="w-4 h-4" />
                            </div>
                            {skill.name}
                          </span>
                          
                          {isAdminMode && (
                            <div className="absolute -top-2 -right-2 flex items-center gap-1 opacity-0 group-hover/skill:opacity-100 transition-all z-20">
                              <button 
                                onClick={() => setEditingTool(skill)}
                                className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg highlight-white/20 transition-transform active:scale-90"
                              >
                                <Pencil className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => removeTool(skill.id)}
                                className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg highlight-white/20 transition-transform active:scale-90"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {isAdminMode && (
                        <button
                          onClick={addTool}
                          className="px-4 py-2.5 bg-transparent border border-dashed border-white/20 rounded-xl text-[12px] text-gray-500 font-medium hover:border-blue-500/50 hover:text-white transition-all flex items-center gap-2"
                        >
                          <Plus className="w-3 h-3" />
                          添加标签
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="mt-auto pt-6">
                    <button 
                      onClick={() => setShowResume(true)}
                      className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center gap-3 font-bold text-base hover:scale-[1.02] active:scale-95 transition-all shadow-[0_10px_30px_rgba(59,130,246,0.3)] group"
                    >
                      <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                      下载完整简历
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Work Experience */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8"
            >
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                    <Briefcase className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 
                    contentEditable={isAdminMode}
                    suppressContentEditableWarning
                    onBlur={(e) => setExperienceTitle(e.currentTarget.innerText)}
                    className={`text-3xl font-bold tracking-tight transition-all duration-500 ${
                      isAdminMode 
                        ? 'bg-white/[0.03] border border-white/10 rounded-xl py-3 px-8 cursor-text text-center' 
                        : ''
                    }`}
                  >
                    {experienceTitle}
                  </h3>
                </div>
                
                {isAdminMode && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={addExperience}
                    className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center shadow-lg transition-colors group"
                  >
                    <Plus className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                  </motion.button>
                )}
              </div>

              <div className="space-y-32 relative before:absolute before:left-[1.5rem] before:top-2 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-blue-500/50 before:via-white/5 before:to-transparent mb-24">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative group">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border border-blue-500/20 flex items-center justify-center bg-[#0A0A0B] z-10 shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.1)] group-hover:border-blue-500/40 transition-colors">
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                        </div>
                        <h4 
                          className="text-3xl md:text-4xl font-bold tracking-tight"
                        >
                          {exp.company}
                        </h4>
                      </div>

                      {isAdminMode && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingExperience(exp)}
                            className="w-10 h-10 rounded-full bg-blue-500/10 hover:bg-blue-500 text-blue-500 hover:text-white flex items-center justify-center border border-blue-500/20 transition-all active:scale-90"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => removeExperience(exp.id)}
                            className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white flex items-center justify-center border border-red-500/20 transition-all active:scale-90"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="pl-16 space-y-8">
                      <div className="flex items-center gap-3 text-base mb-6">
                        <span 
                          className="text-purple-400 font-bold tracking-wide"
                        >
                          {exp.role}
                        </span>
                        <span className="text-gray-700">|</span>
                        <span 
                          className="text-gray-500 font-medium tracking-wide"
                        >
                          {exp.period}
                        </span>
                      </div>
                      
                      <ul className="space-y-5 text-gray-400 leading-relaxed font-light text-lg">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <span className="mt-2.5 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#a855f7' }} />
                            <span className="">
                              {desc}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Personal Advantages */}
              <div className="mb-20">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                    <Sparkles className="w-6 h-6 text-purple-500" />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">个人优势</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {advantages.map((adv, idx) => (
                    <div key={idx} className="group/adv relative bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-all duration-300">
                      <div className="flex items-start gap-6">
                        <div className="mt-2.5 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                        <div 
                          contentEditable={isAdminMode}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const newAdv = [...advantages];
                            newAdv[idx] = e.currentTarget.innerText;
                            setAdvantages(newAdv);
                          }}
                          className={`text-gray-400 text-lg leading-relaxed flex-1 font-light ${isAdminMode ? 'cursor-text focus:outline-none focus:text-white' : ''}`}
                        >
                          {adv}
                        </div>
                        {isAdminMode && (
                          <button 
                            onClick={() => removeAdvantage(idx)}
                            className="opacity-0 group-hover/adv:opacity-100 p-2 text-gray-500 hover:text-red-500 transition-all active:scale-90"
                            title="删除优势"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {isAdminMode && (
                    <button 
                      onClick={() => setAdvantages([...advantages, "新优势项..."])}
                      className="mt-4 py-6 border-2 border-dashed border-white/5 rounded-3xl text-gray-500 hover:text-white hover:border-white/20 hover:bg-white/[0.02] transition-all flex items-center justify-center gap-3 font-bold text-sm tracking-widest uppercase"
                    >
                      <Plus className="w-4 h-4" /> 增加优势
                    </button>
                  )}
                </div>
              </div>

              
            </motion.div>
          </div>
        </div>
      </section>



      {/* Video Showcase Section */}
      <section id="videos" className="py-24 px-6 md:px-12 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="text-center mb-20 flex flex-col items-center">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-purple-500 font-bold tracking-[0.2em] uppercase text-sm mb-4 block"
            >
              作品集
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              contentEditable={isAdminMode}
              suppressContentEditableWarning
              onBlur={(e) => setVideosTitle(e.currentTarget.innerText)}
              className={`text-5xl md:text-6xl font-bold font-display tracking-tight transition-all duration-500 mb-6 ${
                isAdminMode 
                  ? 'bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-12 cursor-text' 
                  : ''
              }`}
            >
              {videosTitle}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              contentEditable={isAdminMode}
              suppressContentEditableWarning
              onBlur={(e) => setVideosDesc(e.currentTarget.innerText)}
              className={`text-gray-400 text-lg max-w-2xl font-light transition-all duration-500 ${
                isAdminMode 
                  ? 'bg-white/[0.03] border border-white/10 rounded-xl py-3 px-8 cursor-text' 
                  : ''
              }`}
            >
              {videosDesc}
            </motion.p>
          </div>

          <div 
            className="relative h-[600px] flex items-center justify-center"
            onMouseEnter={() => setIsCarouselHovered(true)}
            onMouseLeave={() => setIsCarouselHovered(false)}
          >
            {/* Carousel Container */}
            <div className="relative w-full h-full flex items-center justify-center scale-90 md:scale-100">
              {(galleryItems || []).map((item, index) => {
                // Calculate position relative to activeIdx
                const items = galleryItems || [];
                const diff = (index - activeIdx + items.length) % items.length;
                let position = diff;
                if (position > items.length / 2) position -= items.length;

                // Define styles based on position
                const isActive = position === 0;
                const isNeighbor = Math.abs(position) === 1;
                const isOuter = Math.abs(position) === 2;

                let zIndex = 0;
                let scale = 0.5;
                let opacity = 0;
                let x = "0%";
                let blur = "10px";

                if (isActive) {
                  zIndex = 30;
                  scale = 1;
                  opacity = 1;
                  x = "0%";
                  blur = "0px";
                } else if (isNeighbor) {
                  zIndex = 20;
                  scale = 0.8;
                  opacity = 0.5;
                  x = position > 0 ? "28%" : "-28%";
                  blur = "4px";
                } else if (isOuter) {
                  zIndex = 10;
                  scale = 0.6;
                  opacity = 0.2;
                  x = position > 0 ? "48%" : "-48%";
                  blur = "8px";
                }

                return (
                  <motion.div
                    key={item.id}
                    animate={{
                      zIndex,
                      scale,
                      opacity,
                      x,
                      filter: `blur(${blur})`
                    }}
                    whileHover={{ scale: isActive ? 1.05 : scale * 1.05 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                    className="absolute w-full max-w-[720px] aspect-video rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl cursor-pointer group"
                    onClick={() => setActiveIdx(index)}
                  >
                    {item.type === 'video' ? (
                      <video 
                        src={item.img} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    
                    {/* Admin Actions */}
                    {isAdminMode && (
                      <div className="absolute top-8 right-8 flex items-center gap-3 z-[60]">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addGalleryItem();
                          }}
                          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-blue-600 transition-all border border-white/20 flex items-center justify-center shadow-lg transform hover:scale-110 active:scale-95"
                          title="新增卡片"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removeGalleryItem(item.id, item.title);
                          }}
                          className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-red-600 transition-all border border-white/20 flex items-center justify-center shadow-lg transform hover:scale-110 active:scale-95"
                          title="删除卡片"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                    
                    {/* Play Button for center item */}
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isAdminMode) {
                              openMaterialLibrary((material) => {
                                setGalleryItems((galleryItems || []).map(g => g.id === item.id ? { ...g, img: material.url, type: material.type, dbKey: material.dbKey } : g));
                              });
                            } else {
                              setSelectedGalleryItem(item);
                            }
                          }}
                          className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:scale-110 transition-transform duration-500 shadow-2xl z-40 group"
                        >
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center pl-1 group-hover:bg-blue-50 transition-colors">
                            <ChevronDown className="w-8 h-8 text-black -rotate-90" />
                          </div>
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={prevSlide}
              className="absolute left-0 lg:-left-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all z-40 group"
            >
              <ChevronDown className="w-8 h-8 rotate-90 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 lg:-right-4 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:scale-110 transition-all z-40 group"
            >
              <ChevronDown className="w-8 h-8 -rotate-90 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {(galleryItems || []).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`transition-all duration-500 rounded-full h-2 ${
                  i === activeIdx ? "w-10 bg-blue-500" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Portfolio Grid Section */}
      <section id="portfolio" className="py-24 px-6 md:px-12 relative">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-purple-500 font-bold tracking-[0.4em] uppercase mb-4 text-sm"
            >
              作品集
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              contentEditable={isAdminMode}
              suppressContentEditableWarning
              onBlur={(e) => setProjectsTitle(e.currentTarget.innerText)}
              className={`text-6xl md:text-7xl font-bold font-display tracking-tight transition-all duration-500 text-center ${
                isAdminMode 
                  ? 'bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-12 cursor-text' 
                  : ''
              }`}
            >
              {projectsTitle}
            </motion.h2>
          </div>

          {/* Filters */}
          <div 
            className="flex flex-wrap justify-center gap-6 mb-20 items-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleCategoryDrop(e)}
          >
            {categories.filter(cat => cat.name !== "全部").map((catObj) => (
              <div 
                key={catObj.name} 
                className={`relative group/cat cursor-move ${dragOverCategory === catObj.name ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-black' : ''}`}
                draggable={isAdminMode}
                onDragStart={(e) => handleCategoryDragStart(e, catObj.name)}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverCategory(catObj.name);
                }}
                onDragLeave={() => setDragOverCategory(null)}
              >
                <button
                  onClick={() => setActiveCategory(catObj.name)}
                  className={`px-8 py-2.5 rounded-full transition-all duration-300 text-sm font-medium border relative ${
                    activeCategory === catObj.name 
                      ? "bg-white text-black border-white" 
                      : "bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span className="px-1">
                    {catObj.name}
                  </span>
                </button>
                {isAdminMode && (
                  <div className="absolute -top-2 -right-2 flex gap-1 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingCategory({ 
                          oldName: catObj.name, 
                          newName: catObj.name, 
                          displayType: catObj.displayType 
                        });
                        setShowCategoryEditModal(true);
                      }}
                      className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg border border-white/20 hover:bg-blue-600 transition-all active:scale-90"
                      title="编辑"
                    >
                      <Pencil className="w-2.5 h-2.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCategory(catObj.name);
                      }}
                      className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg border border-white/20 hover:bg-red-600 transition-all active:scale-90"
                      title="删除"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {isAdminMode && (
                  <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover/cat:opacity-100 transition-opacity">
                    <GripVertical className="w-4 h-4 text-gray-500" />
                  </div>
                )}
              </div>
            ))}
            {isAdminMode && (
              <button
                onClick={addCategory}
                className="px-8 py-2.5 rounded-full border border-dashed border-white/20 text-gray-400 hover:border-white/40 hover:text-white transition-all duration-300 text-sm font-medium flex items-center gap-2 hover:bg-white/5"
              >
                <Plus className="w-4 h-4" />
                添加分类
              </button>
            )}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            {filteredPortfolio.map((item) => {
              const itemCategory = item.categories && item.categories.length > 0 
                ? categories.find(c => item.categories.includes(c.name)) 
                : null;
              const displayType = itemCategory?.displayType || (categories.find(c => c.name === activeCategory) || categories[0]).displayType;
              const isAPlus = displayType === "A+" || displayType === "gallery";

              return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={item.id}
                    className="group relative cursor-pointer"
                    onClick={() => isAPlus ? setSelectedProject(item) : setZoomItem({ ...item, displayType })}
                  >
                  <div className={`relative rounded-3xl overflow-hidden bg-neutral-900 border border-white/5 shadow-2xl group-hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)] transition-all duration-500
                    ${displayType === "9:16" ? "aspect-[9/16]" : 
                      displayType === "1:1" ? "aspect-square" :
                      displayType === "16:9" ? "aspect-video" :
                      displayType === "4:3" ? "aspect-[4/3]" :
                      displayType === "3:4" ? "aspect-[3/4]" :
                      displayType === "A+" || displayType === "gallery" ? "aspect-square" : 
                      displayType === "other" ? "max-h-[400px]" : "aspect-[4/3]"}
                  `}>
                    {item.type === 'video' || item.image.endsWith('.mp4') || item.image.includes('video') ? (
                      <video 
                        src={item.image} 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        onError={(e) => {
                          const target = e.target as HTMLVideoElement;
                          target.style.display = 'none';
                          const imgElement = target.nextElementSibling as HTMLImageElement;
                          if (imgElement) imgElement.style.display = 'block';
                        }}
                      />
                    ) : null}
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${(item.type === 'video' || item.image.endsWith('.mp4') || item.image.includes('video')) ? 'hidden' : ''} ${displayType === "other" ? "object-contain" : "object-cover"}`} 
                    />
                    
                    {isAdminMode && (
                      <div className="absolute top-6 right-6 flex items-center gap-2 z-[60]">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingPortfolio(item);
                          }}
                          className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-blue-600 transition-colors border border-white/10"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            removePortfolio(item.id, item.title);
                          }}
                          className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-red-600 transition-colors border border-white/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {isAdminMode && (
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          openMaterialLibrary((material) => {
                            setPortfolioItems((portfolioItems || []).map(p => p.id === item.id ? { ...p, image: material.url, type: material.type, dbKey: material.dbKey } : p));
                          });
                        }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                      >
                        <ImageIcon className="w-8 h-8 text-white mb-2" />
                        <span className="text-white text-sm font-medium">更换图片</span>
                      </div>
                    )}
                    
                    {/* Top Badges */}
                    <div className="absolute top-6 left-6 flex gap-2">
                      {item.isFeature && (
                        <span className="px-3 py-1 bg-purple-600 text-white text-[10px] font-bold rounded-lg tracking-wider uppercase">精选</span>
                      )}
                    </div>

                    {/* Hover Overlay */}
                    {isAPlus && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                        {item.tags && item.tags.some((tag: string) => tag && tag.trim() !== "" && tag !== "设计") && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {item.tags.filter((tag: string) => tag && tag.trim() !== "" && tag !== "设计").map(tag => (
                              <span key={tag} className="px-2 py-0.5 bg-white/10 backdrop-blur-md rounded text-[10px] text-white/70 font-medium">#{tag}</span>
                            ))}
                          </div>
                        )}
                        {item.title && item.title !== "新作品" && (
                          <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Add Portfolio Button */}
            {isAdminMode && (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                onClick={() => setEditingPortfolio({ 
                  id: Date.now(), 
                  title: "新作品", 
                  image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231a1a2e'/%3E%3Cstop offset='100%25' style='stop-color:%2316213e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='800' height='600'/%3E%3C/svg%3E",
                  categories: [activeCategory],
                  tags: ["设计"],
                  type: "image",
                  isFeature: false,
                  walmartImages: [],
                  aPlusPCImages: [],
                  aPlusMobileImages: []
                })}
                className={`border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 text-gray-500 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group
                  ${(categories.find(c => c.name === activeCategory) || categories[0]).displayType === "9:16" ? "aspect-[9/16]" : 
                    (categories.find(c => c.name === activeCategory) || categories[0]).displayType === "1:1" ? "aspect-square" :
                    (categories.find(c => c.name === activeCategory) || categories[0]).displayType === "16:9" ? "aspect-video" :
                    (categories.find(c => c.name === activeCategory) || categories[0]).displayType === "4:3" ? "aspect-[4/3]" :
                    (categories.find(c => c.name === activeCategory) || categories[0]).displayType === "3:4" ? "aspect-[3/4]" :
                    (categories.find(c => c.name === activeCategory) || categories[0]).displayType === "A+" || (categories.find(c => c.name === activeCategory) || categories[0]).displayType === "gallery" ? "aspect-square" :
                    (categories.find(c => c.name === activeCategory) || categories[0]).displayType === "other" ? "" : "aspect-[4/3]"}
                `}
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium tracking-wider uppercase">添加新作品</span>
              </motion.button>
            )}
          </div>
        </div>
      </section>
      
      {/* Expertise Section (Bento Grid) */}
      <section id="expertise" className="py-24 px-6 md:px-12 relative border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-purple-500 font-bold tracking-[0.4em] uppercase mb-4 text-sm"
            >
              技能
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              contentEditable={isAdminMode}
              suppressContentEditableWarning
              onBlur={(e) => setExpertiseTitle(e.currentTarget.innerText)}
              className={`text-6xl md:text-7xl font-bold font-display tracking-tight transition-all duration-500 text-center ${
                isAdminMode 
                  ? 'bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-12 cursor-text' 
                  : ''
              }`}
            >
              {expertiseTitle}
            </motion.h2>
          </div>

          <div className="flex flex-wrap gap-6 h-auto">
            {expertiseItems.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -10 }}
                className={`flex-grow shrink-0 basis-full ${item.colSpan.includes('md:col-span-2') ? 'md:flex-[2_0_calc(50%-1.5rem)]' : 'md:flex-[1_0_calc(25%-1.5rem)]'} relative bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 flex flex-col justify-between group ${item.color} transition-all min-h-[320px] md:min-h-[380px]`}
              >
                {isAdminMode && (
                  <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all z-20">
                    <button 
                      onClick={() => setEditingExpertise(item)}
                      className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-blue-600 transition-colors border border-white/10"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => removeExpertise(item.id, item.title)}
                      className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-red-600 transition-colors border border-white/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <div className="text-gray-500 font-medium tracking-widest text-xs mb-12 uppercase flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconRenderer name={item.iconName || 'Sparkles'} className="w-4 h-4 text-gray-400" />
                    {item.tag}
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Add New Expertise Button */}
            {isAdminMode && (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                onClick={() => setEditingExpertise({ id: Date.now(), tag: "Skill", title: "New Skill", desc: "Description here", color: "hover:border-white/20", colSpan: "col-span-1" })}
                className="flex-grow shrink-0 basis-full md:basis-[calc(25%-1.5rem)] border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center gap-4 text-gray-500 hover:text-white hover:border-white/30 transition-all group min-h-[320px] md:min-h-[380px]"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium tracking-wider uppercase">添加专长</span>
              </motion.button>
            )}
          </div>
        </div>
      </section>

      {/* Back to Top Button - works for both main page and modal */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: shouldShowBackToTop ? 1 : 0, 
          scale: shouldShowBackToTop ? 1 : 0.5,
          pointerEvents: shouldShowBackToTop ? "auto" : "none"
        }}
        onClick={scrollToTop}
        className={`fixed bottom-8 ${isAdminMode ? "right-48 md:right-56" : "right-8"} z-[300] w-12 h-12 bg-white/10 backdrop-blur-md border border-white/10 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-600 hover:border-blue-500 transition-all duration-500 active:scale-95 group`}
      >
        <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
      </motion.button>

      {/* Admin Panel */}
      <AnimatePresence>
        {isAdminMode && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-[210] flex flex-col gap-2 items-end"
          >
            <div className="flex items-center gap-2 bg-black/80 backdrop-blur-2xl border border-white/10 p-1.5 rounded-xl shadow-2xl">
              <button 
                onClick={() => setShowResetConfirm(true)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <div className="w-px h-5 bg-white/10" />
              <button 
                onClick={() => setIsAdminMode(false)}
                className="flex items-center gap-2 px-4 py-1.5 bg-red-900/40 hover:bg-red-900/60 text-red-400 border border-red-500/30 rounded-lg transition-all font-bold text-xs tracking-widest"
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                退出管理
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-br from-[#2d2d44] via-[#1a1a2e] to-[#0f0f1a] border border-white/10 rounded-full shadow-2xl min-w-[180px]">
              <ShieldCheck className="w-4 h-4 text-gray-300" />
              <span id="save-status" className="text-white font-bold tracking-[0.2em] text-[10px]">管理员模式</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowResetConfirm(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-[#1a1c24] border border-white/10 rounded-[2rem] p-8 shadow-2xl text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
              
              <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-orange-500/20">
                <RotateCcw className="w-8 h-8 text-orange-500" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">确认重置</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                确定要重置所有内容为默认值吗？<br />
                此操作无法撤销。
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/5 active:scale-95"
                >
                  取消
                </button>
                <button 
                  onClick={handleReset}
                  className="flex-1 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-900/20 active:scale-95"
                >
                  重置
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowDeleteConfirm(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-[#1a1c24] border border-white/10 rounded-[2rem] p-8 shadow-2xl text-center overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
              
              <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
                <X className="w-8 h-8 text-red-500" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">确认删除</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {deleteTarget?.type === 'materialFolder' 
                  ? `确定要删除文件夹 "${deleteTarget.folder}" 及其包含的所有素材吗？`
                  : deleteTarget?.type === 'materialItems'
                  ? `确定要删除选中的 ${deleteTarget.ids?.length || 0} 个素材吗？`
                  : deleteTarget?.type === 'materialItem'
                  ? `确定要删除素材 "${deleteTarget.name || '未命名'}" 吗？`
                  : deleteTarget?.type === 'materialTag'
                  ? `确定要删除标签 "${deleteTarget.name}" 吗？`
                  : deleteTarget?.type === 'galleryItem'
                  ? `确定要删除此艺术项吗？`
                  : deleteTarget?.type === 'advantage'
                  ? `确定要删除此优势项吗？`
                  : `确定要删除此项目吗？`}
                <br />
                此操作无法撤销。
              </p>
              
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/5 active:scale-95"
                >
                  取消
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-900/20 active:scale-95"
                >
                  确认删除
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portfolio Edit Modal */}
      {editingPortfolio && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setEditingPortfolio(null)}
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-3xl font-bold font-display tracking-tight text-white">编辑作品信息</h3>
              <button 
                onClick={() => setEditingPortfolio(null)}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 scrollbar-hide">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">作品封面</label>
                <div className="relative aspect-video rounded-2xl overflow-hidden group mb-4">
                  <img src={editingPortfolio.image} alt="" className="w-full h-full object-cover" />
                  <button 
                    onClick={() => openMaterialLibrary((material) => setEditingPortfolio({...editingPortfolio, image: material.url, type: material.type, dbKey: material.dbKey}))}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center"
                  >
                    <ImageIcon className="w-8 h-8 text-white mb-2" />
                    <span className="text-white text-sm">更换封面</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">项目标题</label>
                <input 
                  type="text" 
                  value={editingPortfolio.title}
                  onChange={(e) => setEditingPortfolio({...editingPortfolio, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all text-lg font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">项目标签 (逗号分隔)</label>
                  <input 
                    type="text" 
                    value={editingPortfolio.tags.join(', ')}
                    onChange={(e) => setEditingPortfolio({...editingPortfolio, tags: e.target.value.split(',').map(s => s.trim())})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">是否精选展示</label>
                  <div className="flex items-center gap-4 h-[56px]">
                    <button 
                      onClick={() => setEditingPortfolio({...editingPortfolio, isFeature: !editingPortfolio.isFeature})}
                      className={`px-4 py-2 rounded-xl border transition-all ${editingPortfolio.isFeature ? 'bg-purple-600 border-purple-500 text-white' : 'bg-white/5 border-white/10 text-gray-400'}`}
                    >
                      {editingPortfolio.isFeature ? '精选项目' : '普通项目'}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">分类设置</label>
                <div className="flex flex-wrap gap-2">
                  {categories.filter(c => c.name !== "全部").map(catObj => (
                    <button 
                      key={catObj.name}
                      onClick={() => {
                        const newCats = editingPortfolio.categories.includes(catObj.name)
                          ? editingPortfolio.categories.filter((c: string) => c !== catObj.name)
                          : [...editingPortfolio.categories, catObj.name];
                        setEditingPortfolio({...editingPortfolio, categories: newCats});
                      }}
                      className={`px-4 py-2 rounded-xl text-sm transition-all border ${editingPortfolio.categories.includes(catObj.name) ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-gray-500'}`}
                    >
                      {catObj.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Check if any selected category has displayType "gallery" or "A+" */}
              {(() => {
                const hasGalleryType = editingPortfolio.categories && editingPortfolio.categories.length > 0
                  ? editingPortfolio.categories.some(catName => {
                      const cat = categories.find(c => c.name === catName);
                      return cat?.displayType === "gallery";
                    })
                  : false;
                
                const hasAPlusType = editingPortfolio.categories && editingPortfolio.categories.length > 0
                  ? editingPortfolio.categories.some(catName => {
                      const cat = categories.find(c => c.name === catName);
                      return cat?.displayType === "A+";
                    })
                  : false;
                
                // Only show settings for gallery or A+ types
                if (!hasGalleryType && !hasAPlusType) return null;
                
                return (
                  <div className="space-y-8">
                    {/* Walmart Images Management - Show for both gallery and A+ types */}
                    {(hasGalleryType || hasAPlusType) && (
                      <div>
                        <div className="flex items-center justify-between mb-3 ml-1">
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">套图 (Gallery)</label>
                          <button 
                            onClick={() => openMaterialLibrary(
                              (material) => setEditingPortfolio(prev => ({
                                ...prev, 
                                walmartImages: [...(prev.walmartImages || []), material.url]
                              })),
                              (materials) => setEditingPortfolio(prev => ({
                                ...prev, 
                                walmartImages: [...(prev.walmartImages || []), ...((materials || []).map(m => m.url))]
                              }))
                            )}
                            className="text-[10px] text-blue-500 font-bold uppercase tracking-widest flex items-center gap-1 hover:text-blue-400"
                          >
                            <Plus className="w-3 h-3" /> 添加图片
                          </button>
                        </div>
                        <div className="grid grid-cols-4 gap-3 bg-white/5 p-4 rounded-3xl border border-white/5">
                          {(editingPortfolio.walmartImages || []).length === 0 && <span className="col-span-full text-center py-4 text-gray-600 text-xs">暂无套图</span>}
                          {(editingPortfolio.walmartImages || []).map((img: string, idx: number) => (
                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group">
                              <img src={img} alt="" className="w-full h-full object-cover" />
                              <button 
                                onClick={() => {
                                  const newImgs = [...editingPortfolio.walmartImages];
                                  newImgs.splice(idx, 1);
                                  setEditingPortfolio({...editingPortfolio, walmartImages: newImgs});
                                }}
                                className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* A+ Images Management - Only show for A+ type */}
                    {hasAPlusType && (
                      <>
                        {/* A+ PC端详情图 */}
                        <div>
                          <div className="flex items-center justify-between mb-3 ml-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">A+ PC端详情图 (A+ Desktop)</label>
                            <button 
                              onClick={() => openMaterialLibrary(
                                (material) => setEditingPortfolio(prev => ({
                                  ...prev, 
                                  aPlusPCImages: [...(prev.aPlusPCImages || []), material.url]
                                })),
                                (materials) => setEditingPortfolio(prev => ({
                                  ...prev, 
                                  aPlusPCImages: [...(prev.aPlusPCImages || []), ...((materials || []).map(m => m.url))]
                                }))
                              )}
                              className="text-[10px] text-purple-500 font-bold uppercase tracking-widest flex items-center gap-1 hover:text-purple-400"
                            >
                              <Plus className="w-3 h-3" /> 添加图片
                            </button>
                          </div>
                          <div className="flex flex-col gap-3 bg-white/5 p-4 rounded-3xl border border-white/5">
                            {(editingPortfolio.aPlusPCImages || []).length === 0 && <span className="text-center py-4 text-gray-600 text-xs">暂无 A+ PC图</span>}
                            {(editingPortfolio.aPlusPCImages || []).map((img: string, idx: number) => (
                              <div key={idx} className="relative w-full aspect-[21/9] rounded-xl overflow-hidden group">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                                <button 
                                  onClick={() => {
                                    const newImgs = [...editingPortfolio.aPlusPCImages];
                                    newImgs.splice(idx, 1);
                                    setEditingPortfolio({...editingPortfolio, aPlusPCImages: newImgs});
                                  }}
                                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* A+ 手机端详情图 */}
                        <div>
                          <div className="flex items-center justify-between mb-3 ml-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest">A+ 手机端详情图 (A+ Mobile)</label>
                            <button 
                              onClick={() => openMaterialLibrary(
                                (material) => setEditingPortfolio(prev => ({
                                  ...prev, 
                                  aPlusMobileImages: [...(prev.aPlusMobileImages || []), material.url]
                                })),
                                (materials) => setEditingPortfolio(prev => ({
                                  ...prev, 
                                  aPlusMobileImages: [...(prev.aPlusMobileImages || []), ...((materials || []).map(m => m.url))]
                                }))
                              )}
                              className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest flex items-center gap-1 hover:text-indigo-400"
                            >
                              <Plus className="w-3 h-3" /> 添加图片
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-3 bg-white/5 p-4 rounded-3xl border border-white/5">
                            {(editingPortfolio.aPlusMobileImages || []).length === 0 && <span className="col-span-2 text-center py-4 text-gray-600 text-xs">暂无 A+ 手机图</span>}
                            {(editingPortfolio.aPlusMobileImages || []).map((img: string, idx: number) => (
                              <div key={idx} className="relative aspect-[9/16] rounded-xl overflow-hidden group">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                                <button 
                                  onClick={() => {
                                    const newImgs = [...editingPortfolio.aPlusMobileImages];
                                    newImgs.splice(idx, 1);
                                    setEditingPortfolio({...editingPortfolio, aPlusMobileImages: newImgs});
                                  }}
                                  className="absolute top-2 right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })()}
            </div>

            <div className="flex gap-4 pt-8">
              <button 
                onClick={() => setEditingPortfolio(null)}
                className="flex-1 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all active:scale-[0.98]"
              >
                取消
              </button>
              <button 
                onClick={() => handleUpdatePortfolio(editingPortfolio)}
                className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-xl shadow-indigo-900/20 hover:shadow-indigo-600/40 hover:-translate-y-1 transition-all active:scale-[0.98]"
              >
                保存更新
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Tool Edit Modal */}
      {editingTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setEditingTool(null)}
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-lg bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-3xl font-bold font-display tracking-tight text-white">编辑工具项</h3>
              <button 
                onClick={() => setEditingTool(null)}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">工具名称</label>
                <input 
                  type="text" 
                  value={editingTool.name}
                  onChange={(e) => setEditingTool({...editingTool, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-lg font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">选择图标</label>
                <IconPicker 
                  selected={editingTool.iconName} 
                  onSelect={(name) => setEditingTool({...editingTool, iconName: name})} 
                  onOpenLibrary={() => openMaterialLibrary((material) => setEditingTool({...editingTool, iconName: material.url}))}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setEditingTool(null)}
                  className="flex-1 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all active:scale-[0.98]"
                >
                  取消
                </button>
                <button 
                  onClick={() => handleUpdateTool(editingTool)}
                  className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-xl shadow-blue-900/20 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all active:scale-[0.98]"
                >
                  保存更新
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Expertise Edit Modal */}
      {editingExpertise && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setEditingExpertise(null)}
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-2xl"
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-3xl font-bold font-display tracking-tight text-white">编辑专长项</h3>
              <button 
                onClick={() => setEditingExpertise(null)}
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-95"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="space-y-8 max-h-[65vh] overflow-y-auto pr-4 scrollbar-hide">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">标签 (Tag)</label>
                  <input 
                    type="text" 
                    value={editingExpertise.tag}
                    onChange={(e) => setEditingExpertise({...editingExpertise, tag: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">布局大小</label>
                  <select 
                    value={editingExpertise.colSpan}
                    onChange={(e) => setEditingExpertise({...editingExpertise, colSpan: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-sm"
                  >
                    <option value="col-span-1" className="bg-zinc-900 text-white">标准 (1列)</option>
                    <option value="col-span-1 md:col-span-2" className="bg-zinc-900 text-white">宽块 (2列)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">选择图标</label>
                <IconPicker 
                  selected={editingExpertise.iconName || 'Sparkles'} 
                  onSelect={(name) => setEditingExpertise({...editingExpertise, iconName: name})} 
                  onOpenLibrary={() => openMaterialLibrary((material) => setEditingExpertise({...editingExpertise, iconName: material.url}))}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">标题</label>
                <input 
                  type="text" 
                  value={editingExpertise.title}
                  onChange={(e) => setEditingExpertise({...editingExpertise, title: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-lg font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 ml-1">描述内容</label>
                <textarea 
                  value={editingExpertise.desc}
                  onChange={(e) => setEditingExpertise({...editingExpertise, desc: e.target.value})}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-sm leading-relaxed resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setEditingExpertise(null)}
                  className="flex-1 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all active:scale-[0.98]"
                >
                  取消
                </button>
                <button 
                  onClick={() => handleUpdateExpertise(editingExpertise)}
                  className="flex-1 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-xl shadow-blue-900/20 hover:shadow-blue-600/40 hover:-translate-y-1 transition-all active:scale-[0.98]"
                >
                  保存更新
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Experience Edit Modal */}
      <AnimatePresence>
        {editingExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#0D0D0E] border border-white/10 w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative flex flex-col my-auto"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                    <Pencil className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">编辑经历</h3>
                    <p className="text-gray-500 text-xs mt-1 uppercase tracking-widest font-medium">Edit Work Experience</p>
                  </div>
                </div>
                <button 
                  onClick={() => setEditingExperience(null)}
                  className="w-12 h-12 rounded-full hover:bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">公司名称</label>
                    <input 
                      type="text"
                      value={editingExperience.company}
                      onChange={(e) => setEditingExperience({...editingExperience, company: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-700"
                      placeholder="公司名称"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">职位角色</label>
                    <input 
                      type="text"
                      value={editingExperience.role}
                      onChange={(e) => setEditingExperience({...editingExperience, role: e.target.value})}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-700"
                      placeholder="UI/UX Designer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold ml-1">在职时间</label>
                  <input 
                    type="text"
                    value={editingExperience.period}
                    onChange={(e) => setEditingExperience({...editingExperience, period: e.target.value})}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-700"
                    placeholder="2024.01 - Present"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between ml-1">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">工作内容</label>
                    <button 
                      onClick={() => setEditingExperience({
                        ...editingExperience, 
                        description: [...editingExperience.description, ""]
                      })}
                      className="text-[10px] text-blue-500 uppercase tracking-widest font-bold hover:text-blue-400 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> 添加一条
                    </button>
                  </div>
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {editingExperience.description.map((desc: string, idx: number) => (
                      <div key={idx} className="flex gap-3">
                        <textarea 
                          value={desc}
                          onChange={(e) => {
                            const newDesc = [...editingExperience.description];
                            newDesc[idx] = e.target.value;
                            setEditingExperience({...editingExperience, description: newDesc});
                          }}
                          rows={2}
                          className="flex-1 bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500/50 outline-none transition-all text-sm resize-none"
                          placeholder={`描述内容 ${idx + 1}`}
                        />
                        <button 
                          onClick={() => {
                            const newDesc = editingExperience.description.filter((_: any, i: number) => i !== idx);
                            setEditingExperience({...editingExperience, description: newDesc});
                          }}
                          className="w-12 h-12 shrink-0 rounded-2xl bg-red-500/5 hover:bg-red-500/10 text-red-500 flex items-center justify-center border border-red-500/10 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-white/5 flex gap-4">
                <button 
                  onClick={() => setEditingExperience(null)}
                  className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all border border-white/5 active:scale-95"
                >
                  取消
                </button>
                <button 
                  onClick={() => handleUpdateExperience(editingExperience)}
                  className="flex-1 py-5 bg-white text-black hover:bg-blue-50 font-black rounded-2xl transition-all shadow-xl shadow-white/5 flex items-center justify-center gap-3 active:scale-95"
                >
                  <Save className="w-5 h-5" />
                  保存修改
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Auth Modal */}
      <AnimatePresence>
        {showAdminAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[260] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-neutral-900 border border-white/10 p-10 rounded-[2.5rem] w-full max-w-sm shadow-2xl relative"
            >
              <button 
                onClick={() => setShowAdminAuth(false)}
                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-blue-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <Lock className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight">身份验证</h3>
                <p className="text-gray-500 text-sm mt-2">请输入管理员密码访问后台</p>
              </div>

              <form onSubmit={handleAdminAuth} className="space-y-6">
                <div className="space-y-2">
                  <input 
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="ENTER PASSWORD"
                    className={`w-full bg-black/40 border ${passwordError ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'border-white/10'} rounded-[1.25rem] px-6 py-5 text-center text-white font-mono tracking-[0.5em] focus:border-blue-500 outline-none transition-all placeholder:text-gray-600 placeholder:tracking-normal placeholder:font-sans`}
                    autoFocus
                  />
                  {passwordError && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-[10px] uppercase font-bold tracking-widest text-center"
                    >
                      ERR: 密码错误
                    </motion.p>
                  )}
                </div>
                <button 
                  type="submit"
                  className="w-full py-5 bg-white text-black rounded-[1.25rem] font-bold tracking-[0.3em] text-sm uppercase hover:bg-blue-50 transition-all active:scale-[0.98] shadow-xl"
                >
                  登录
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center">
            {/* Background Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a0a14]/98 backdrop-blur-2xl"
              onClick={() => setSelectedProject(null)}
            />
            
            {/* Fixed Navigation Arrows - These stay in the middle of the screen while scrolling */}
            <div className="fixed inset-0 pointer-events-none z-[170] flex items-center justify-center invisible xl:visible">
              <div className="relative w-full max-w-[1600px] h-full">
                <div className="absolute -left-20 xl:-left-28 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handlePrevProject(); }}
                    className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center hover:scale-110 transition-all active:scale-95 group shadow-2xl backdrop-blur-md pointer-events-auto"
                    title="上一个项目 (Left Arrow)"
                  >
                    <ChevronLeft className="w-8 h-8 text-white group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="absolute -right-20 xl:-right-28 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleNextProject(); }}
                    className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center hover:scale-110 transition-all active:scale-95 group shadow-2xl backdrop-blur-md pointer-events-auto"
                    title="下一个项目 (Right Arrow)"
                  >
                    <ChevronRight className="w-8 h-8 text-white group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <motion.div
              ref={modalScrollRef}
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-[160] w-full h-full overflow-y-auto px-4 md:px-6 pt-24 md:pt-32 pb-12 scrollbar-hide flex flex-col items-center"
              onClick={() => setSelectedProject(null)}
              onScroll={(e) => {
                const target = e.currentTarget;
                setModalIsScrolled(target.scrollTop > 100);
              }}
            >
              {/* Mobile Arrows (Visible only on smaller screens, at top) */}
              <div className="xl:hidden flex gap-4 mb-8 pointer-events-auto">
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrevProject(); }}
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleNextProject(); }}
                  className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              <div 
                className="relative w-full max-w-[1600px] flex flex-col my-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Main Modal Body */}
                <div className="relative w-full bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl">
                  {/* Sticky Header */}
                  <div className="sticky top-0 bg-[#0a0a14]/80 backdrop-blur-md z-50 p-6 md:p-10 border-b border-white/5 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-gray-500 text-xs font-bold tracking-[0.3em] uppercase">项目详情 Project Detail</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{selectedProject.title}</h3>
                    </div>
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:border-red-500 transition-all active:scale-90 group"
                    >
                      <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>
                  </div>

                  {/* Modal Grid Content */}
                  <div className="p-4 md:p-12">
                    {(() => {
                      // Check if any category of the project has displayType "gallery"
                      const isGalleryOnly = selectedProject.categories && selectedProject.categories.length > 0 
                        ? selectedProject.categories.some(catName => {
                            const cat = categories.find(c => c.name === catName);
                            return cat?.displayType === "gallery";
                          })
                        : false;
                      
                      if (isGalleryOnly) {
                        return (
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                            {/* Gallery Only View - Full Width */}
                            <div className="lg:col-span-12 space-y-10">
                              <div className="flex items-center justify-between border-b-2 border-white/10 pb-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                                    <Store className="w-5 h-5 text-green-400" />
                                  </div>
                                  <div>
                                    <h4 className="text-xl font-black text-white tracking-tighter uppercase leading-none italic">Gallery</h4>
                                  </div>
                                </div>
                              </div>

                              {selectedProject.walmartImages && selectedProject.walmartImages.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start">
                                  {selectedProject.walmartImages.map((img: string, idx: number) => (
                                    <div 
                                      key={`w-${idx}`}
                                      className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-lg"
                                    >
                                      <img src={img} alt="" className="w-full h-auto" />
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="p-12 text-center text-gray-600 italic text-sm border border-dashed border-white/10 rounded-3xl">
                                  No Gallery Images Added
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                            {/* Left Column: Side-by-Side A+ Content */}
                            <div className="lg:col-span-8">
                              <div className="flex flex-col gap-8">
                                <div className="flex items-center justify-between border-b-2 border-white/10 pb-4">
                                  <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                                      <Layout className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <div>
                                      <h4 className="text-xl font-black text-white tracking-tighter uppercase leading-none italic">A+ Side-by-Side View</h4>
                                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1 block">Parallel Comparison</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                                  {/* PC Part */}
                                  <div className="md:col-span-8 space-y-4">
                                    <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-white/5 rounded-full w-fit border border-white/10">
                                      <Monitor className="w-3.5 h-3.5 text-blue-400" />
                                      <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">PC Version</span>
                                    </div>
                                    {selectedProject.aPlusPCImages && selectedProject.aPlusPCImages.length > 0 ? (
                                      <div className="flex flex-col rounded-3xl overflow-hidden bg-neutral-900 border border-white/5 shadow-2xl">
                                        {selectedProject.aPlusPCImages.map((img: string, idx: number) => (
                                          <motion.div 
                                            key={`pc-${idx}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="w-full"
                                          >
                                            <img src={img} alt={`pc-${idx}`} className="w-full h-auto block" />
                                          </motion.div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="aspect-video bg-white/5 rounded-3xl border border-dashed border-white/10 flex items-center justify-center text-gray-600 text-xs italic">
                                        No PC Modules Added
                                      </div>
                                    )}
                                  </div>

                                  {/* Mobile Part */}
                                  <div className="md:col-span-4 space-y-4">
                                    <div className="flex items-center gap-2 mb-4 px-4 py-2 bg-white/5 rounded-full w-fit border border-white/10">
                                      <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                                      <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">Mobile Version</span>
                                    </div>
                                    {selectedProject.aPlusMobileImages && selectedProject.aPlusMobileImages.length > 0 ? (
                                      <div className="flex flex-col rounded-3xl overflow-hidden bg-neutral-900 border border-white/5 shadow-xl">
                                        {selectedProject.aPlusMobileImages.map((img: string, idx: number) => (
                                          <motion.div 
                                            key={`mob-${idx}`}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="w-full"
                                          >
                                            <img src={img} alt={`mob-${idx}`} className="w-full h-auto block" />
                                          </motion.div>
                                        ))}
                                      </div>
                                    ) : (
                                      <div className="aspect-[9/16] bg-white/5 rounded-3xl border border-dashed border-white/10 flex items-center justify-center text-gray-600 text-xs italic">
                                        No Mobile Modules Added
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Right Column: Gallery/Walmart Set */}
                            <div className="lg:col-span-4 space-y-10">
                              <div className="flex items-center justify-between border-b-2 border-white/10 pb-4">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-500/30">
                                    <Store className="w-5 h-5 text-green-400" />
                                  </div>
                                  <div>
                                    <h4 className="text-xl font-black text-white tracking-tighter uppercase leading-none italic">Gallery</h4>
                                  </div>
                                </div>
                              </div>

                              {selectedProject.walmartImages && selectedProject.walmartImages.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4 items-start">
                                  {selectedProject.walmartImages.map((img: string, idx: number) => (
                                    <div 
                                      key={`w-${idx}`}
                                      className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/5 shadow-lg"
                                    >
                                      <img src={img} alt="" className="w-full h-auto" />
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="p-8 text-center text-gray-600 italic text-xs border border-dashed border-white/10 rounded-3xl">
                                  No Gallery Images Added
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }
                    })()}
                  </div>
                </div>

                {/* Bottom Instruction Text */}
                <div className="mt-8 text-center pb-8">
                  <div className="inline-flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 py-2.5 px-5 rounded-full shadow-2xl">
                    <div className="flex gap-2">
                      <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-lg text-white/80 text-sm border border-white/10 shadow-sm">←</div>
                      <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-lg text-white/80 text-sm border border-white/10 shadow-sm">→</div>
                    </div>
                    <span className="text-[13px] text-white/60 font-medium tracking-tight">按键盘上的方向键可以切换项目</span>
                    <span className="text-[13px] text-white/30 font-medium">|</span>
                    <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-lg text-white/80 text-xs border border-white/10 shadow-sm font-bold">ESC</div>
                    <span className="text-[13px] text-white/60 font-medium tracking-tight">按键盘上的ESC键可以返回</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedGalleryItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6 md:p-12"
          >
            <motion.div 
              layoutId={`gallery-${selectedGalleryItem.id}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[1240px] aspect-video group"
            >
              {/* Navigation Buttons */}
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrevGallery(); }}
                className="absolute -left-6 md:-left-20 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all z-[120] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/10 hover:scale-110 active:scale-95 group/nav"
              >
                <ChevronLeft className="w-8 h-8 transition-transform group-hover/nav:-translate-x-1" />
              </button>

              <button 
                onClick={(e) => { e.stopPropagation(); handleNextGallery(); }}
                className="absolute -right-6 md:-right-20 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all z-[120] w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/10 hover:scale-110 active:scale-95 group/nav"
              >
                <ChevronRight className="w-8 h-8 transition-transform group-hover/nav:translate-x-1" />
              </button>

              <div 
                className="w-full h-full relative rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.15)] bg-neutral-900 border border-white/10 cursor-pointer"
                onClick={handleNextGallery}
              >
                {selectedGalleryItem.type === 'video' ? (
                  <video 
                    src={selectedGalleryItem.img} 
                    autoPlay 
                    controls 
                    controlsList="nodownload noplaybackrate noremoteplayback"
                    disablePictureInPicture
                    disableRemotePlayback
                    playsInline
                    loop 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img 
                    src={selectedGalleryItem.img} 
                    alt={selectedGalleryItem.title} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {/* Overlay UI removed to favor native controls */}
              
              <button 
                onClick={() => setSelectedGalleryItem(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-[100]"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Instruction Text */}
              <div className="absolute -bottom-24 left-0 right-0 text-center">
                <div className="inline-flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 py-2.5 px-5 rounded-full shadow-2xl">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-lg text-white/80 text-sm border border-white/10 shadow-sm">←</div>
                    <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-lg text-white/80 text-sm border border-white/10 shadow-sm">→</div>
                  </div>
                  <span className="text-[13px] text-white/60 font-medium tracking-tight">按键盘上的方向键可以切换视频/作品</span>
                  <span className="text-[13px] text-white/30 font-medium">|</span>
                  <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-lg text-white/80 text-xs border border-white/10 shadow-sm font-bold">ESC</div>
                  <span className="text-[13px] text-white/60 font-medium tracking-tight">按键盘上的ESC键可以返回</span>
                </div>
              </div>
            </motion.div>
            
            {/* Click outside to close */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={() => setSelectedGalleryItem(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Material Library Modal */}
      <AnimatePresence>
        {showMaterialLibrary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-[#0A0A0B]/95 backdrop-blur-xl" onClick={() => setShowMaterialLibrary(false)} />
            
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className={`relative w-full max-w-6xl h-full max-h-[85vh] bg-[#161618] rounded-3xl border ${isDraggingOverLibrary ? 'border-blue-500 bg-blue-500/5' : 'border-white/10'} shadow-2xl flex flex-col overflow-hidden transition-all duration-300`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleLocalUpload} 
                className="hidden" 
                accept="image/*,video/*"
                multiple
              />
              <input 
                type="file" 
                ref={folderInputRef} 
                onChange={handleLocalUpload} 
                className="hidden" 
                accept="image/*,video/*"
                {...({ webkitdirectory: "", directory: "" } as any)}
              />
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                    <Folder className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">素材库</h2>
                    <p className="text-gray-500 text-sm">{materials.length} 个素材</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                    <button 
                      onClick={() => setLibraryView('grid')}
                      className={`p-2 rounded-lg transition-colors ${libraryView === 'grid' ? "bg-white/10 text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
                    >
                      <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setLibraryView('list')}
                      className={`p-2 rounded-lg transition-colors ${libraryView === 'list' ? "bg-white/10 text-white shadow-lg" : "text-gray-500 hover:text-white"}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>

                  {selectedMaterials.length > 0 && (
                    <>
                      <button 
                        onClick={() => {
                          if (selectedMaterials.length > 1) {
                            if (materialBatchCallback) {
                              materialBatchCallback(selectedMaterials);
                            } else {
                              // 如果没有批量回调，依次调用单个回调
                              selectedMaterials.forEach((m, index) => {
                                setTimeout(() => {
                                  materialSelectionCallback(m);
                                }, index * 50);
                              });
                            }
                          } else {
                            materialSelectionCallback(selectedMaterials[0]);
                          }
                          setSelectedMaterials([]);
                          setShowMaterialLibrary(false);
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center gap-2 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        确认选择 ({selectedMaterials.length})
                      </button>
                      
                      <button 
                        onClick={removeSelectedMaterials}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium flex items-center gap-2 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        删除选中 ({selectedMaterials.length})
                      </button>
                    </>
                  )}
                  
                  <button 
                    onClick={() => setShowMaterialLibrary(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Filter Tabs */}
                <div className="px-8 py-4 border-b border-white/5 overflow-x-auto scrollbar-hide shrink-0">
                  <div className="flex gap-2 min-w-max">
                    <button
                      onClick={() => setLibraryCategory("全部")}
                      className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        libraryCategory === "全部" 
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                          : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      全部
                    </button>
                    {materialCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setLibraryCategory(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                          libraryCategory === cat 
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                            : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}

                    <button 
                      onClick={() => setShowTagManagement(true)}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-dashed border-white/20 text-gray-500 hover:text-white transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                  {libraryFolder && (
                    <button 
                      onClick={() => setLibraryFolder(null)}
                      className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>返回根目录 / {libraryFolder}</span>
                    </button>
                  )}

                  {materials.filter(m => libraryCategory === "全部" || m.category === libraryCategory).length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-50">
                      <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6">
                        <Folder className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-medium text-white mb-2">素材库暂无素材</h3>
                      <p className="text-gray-500 text-center max-w-xs mb-8">
                        从本地上传素材会自动保存到素材库中
                      </p>
                      
                      <div className="flex gap-4">
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-white/10 rounded-[2rem] hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group w-40"
                        >
                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                            <Upload className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-center">
                            <span className="block text-white font-medium">上传素材</span>
                            <span className="text-[10px] text-gray-500">支持多选图片/视频</span>
                          </div>
                        </button>

                        <button 
                          onClick={() => folderInputRef.current?.click()}
                          className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-white/10 rounded-[2rem] hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group w-40"
                        >
                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                            <FolderPlus className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-center">
                            <span className="block text-white font-medium">上传文件夹</span>
                            <span className="text-[10px] text-gray-500">包含子目录自动分类</span>
                          </div>
                        </button>
                      </div>

                      <div className="mt-6 p-4 border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
                        <div className="flex items-center gap-3 text-gray-500 text-sm">
                          <Sparkles className="w-4 h-4" />
                          <span>也可以直接拖拽多个文件或文件夹到窗口任意位置进行上传</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`grid ${libraryView === 'grid' ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" : "grid-cols-1"} gap-6`}>
                      {/* Folders in Root View */}
                      {!libraryFolder && Array.from(new Set((materials || [])
                        .filter(m => (libraryCategory === "全部" || m.category === libraryCategory) && m.folder)
                        .map(m => m.folder)))
                        .map(folderName => (
                          <div 
                            key={`folder-${folderName}`}
                            onClick={() => setLibraryFolder(folderName as string)}
                            className={`group cursor-pointer relative rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/50 transition-all flex flex-col items-center justify-center gap-4 bg-white/[0.02] ${libraryView === 'list' ? "h-20 flex-row px-6" : "aspect-square"}`}
                          >
                            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 group-hover:bg-orange-500 group-hover:text-white transition-all">
                              <Folder className="w-6 h-6 text-orange-500 group-hover:text-white" />
                            </div>
                            <div className={libraryView === 'list' ? "text-left flex-1" : "text-center"}>
                              <p className="text-white font-medium truncate">{folderName}</p>
                              <p className="text-[10px] text-gray-500">
                                {(materials || []).filter(m => m.folder === folderName).length} 个素材
                              </p>
                            </div>
                            
                            <button 
                              onClick={(e) => removeFolder(folderName as string, e)}
                              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 text-white transition-all z-10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            {libraryView === 'list' && (
                              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                            )}
                          </div>
                      ))}

                      {/* Materials */}
                      {(materials || [])
                        .filter(m => (libraryCategory === "全部" || m.category === libraryCategory) && m.folder === libraryFolder)
                        .map((material) => {
                          const isSelected = selectedMaterials.some(m => m.id === material.id);
                          return (
                        <div 
                          key={material.id}
                          onClick={(e) => {
                            if (e.ctrlKey || e.metaKey) {
                              e.preventDefault();
                              if (isSelected) {
                                setSelectedMaterials(prev => prev.filter(m => m.id !== material.id));
                              } else {
                                setSelectedMaterials(prev => [...prev, material]);
                              }
                            } else {
                              if (isSelected) {
                                setSelectedMaterials(prev => prev.filter(m => m.id !== material.id));
                              } else {
                                setSelectedMaterials(prev => [...prev, material]);
                              }
                            }
                          }}
                          className={`group cursor-pointer relative rounded-2xl overflow-hidden border transition-all ${isSelected ? 'border-blue-500 bg-blue-500/10' : 'border-white/5 hover:border-blue-500/50'} ${libraryView === 'list' ? "flex items-center gap-6 p-4 h-28 bg-white/[0.02]" : "aspect-square"}`}
                        >
                          {/* Selection Checkbox */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isSelected) {
                                setSelectedMaterials(prev => prev.filter(m => m.id !== material.id));
                              } else {
                                setSelectedMaterials(prev => [...prev, material]);
                              }
                            }}
                            className={`absolute top-3 left-3 w-6 h-6 rounded-lg border-2 flex items-center justify-center z-20 transition-all ${isSelected ? 'bg-blue-500 border-blue-500' : 'bg-black/60 border-white/20 hover:border-blue-500/50'}`}
                          >
                            {isSelected && <Check className="w-4 h-4 text-white" />}
                          </button>

                          {material.type === 'video' ? (
                            <div className={`${libraryView === 'list' ? "w-40 h-full rounded-xl overflow-hidden" : "w-full h-full"} relative bg-neutral-900`}>
                              <video 
                                src={material.url} 
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  console.error("Video load failed:", material.url, e);
                                  const target = e.target as HTMLVideoElement;
                                  target.style.display = 'none';
                                }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <Play className="w-8 h-8 text-white fill-white" />
                              </div>
                            </div>
                          ) : (
                            <img 
                              src={material.url} 
                              className={`${libraryView === 'list' ? "w-40 h-full rounded-xl overflow-hidden" : "w-full h-full"} object-cover`} 
                              alt="material"
                              onError={(e) => {
                                console.error("Image load failed:", material.url, e);
                                const target = e.target as HTMLImageElement;
                                target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Crect fill='%231a1a2e' width='400' height='400'/%3E%3Ctext fill='%23666' font-size='14' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E图片加载失败%3C/text%3E%3C/svg%3E`;
                              }}
                            />
                          )}
                          
                          {libraryView === 'list' && (
                            <div className="flex-1 flex items-center justify-between">
                              <div>
                                <p className="text-white font-medium truncate mb-1">{material.name || `素材 #${material.id}`}</p>
                                <div className="flex items-center gap-3 text-gray-500 text-xs">
                                  <span>{material.size || '未知大小'}</span>
                                  <span className="w-1 h-1 rounded-full bg-white/10" />
                                  <span>{material.type === 'video' ? '视频' : '图片'}</span>
                                  <span className="w-1 h-1 rounded-full bg-white/10" />
                                  <span>{material.date || '未知日期'}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                  {material.type === 'video' ? <Play className="w-4 h-4 fill-current" /> : <ImageIcon className="w-4 h-4" />}
                                </div>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeMaterialItem(material.id, material.name);
                                  }}
                                  className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                          
                          {libraryView === 'grid' && (
                            <>
                              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isSelected ? 'opacity-60' : ''}`} />
                              <div className={`absolute inset-0 border-2 transition-opacity rounded-2xl ${isSelected ? 'opacity-100 border-blue-500' : 'opacity-0 group-hover:opacity-100 group-hover:border-blue-500'}`} />
                              
                              {/* Top Right Action Buttons */}
                              <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                                <div className="w-8 h-8 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                                  {material.type === 'video' ? <Play className="w-3.5 h-3.5 fill-current" /> : <ImageIcon className="w-3.5 h-3.5" />}
                                </div>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeMaterialItem(material.id, material.name);
                                  }}
                                  className="w-8 h-8 rounded-xl bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Bottom Info Overlay */}
                              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[10px] group-hover:translate-y-0">
                                <p className="text-white text-sm font-bold truncate mb-0.5">{material.name || `素材 #${material.id}`}</p>
                                <div className="flex items-center gap-2 text-white/60 text-[10px] font-medium">
                                  <span>{material.size || '0 MB'}</span>
                                  <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                                  <span>{material.type === 'video' ? '视频' : '图片'}</span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      )})
                    }
                    
                      {/* Add Material Card */}
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className={`${libraryView === 'grid' ? "aspect-square flex-col" : "h-20 flex-row px-6 bg-white/[0.02]"} border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-4 text-gray-500 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group w-full`}
                      >
                        <div className={`flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-600 group-hover:text-white transition-all ${libraryView === 'grid' ? "w-12 h-12" : "w-10 h-10"}`}>
                          <Plus className={libraryView === 'grid' ? "w-6 h-6" : "w-5 h-5"} />
                        </div>
                        <div className={libraryView === 'list' ? "text-left" : "text-center"}>
                          <p className="text-sm font-medium text-white">添加素材</p>
                          <p className="text-[10px] text-gray-500">点击或拖拽上传</p>
                        </div>
                      </button>

                      {/* Add Folder Card */}
                      {!libraryFolder && (
                        <button 
                          onClick={() => folderInputRef.current?.click()}
                          className={`${libraryView === 'grid' ? "aspect-square flex-col" : "h-20 flex-row px-6 bg-white/[0.02]"} border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center gap-4 text-gray-500 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group w-full`}
                        >
                          <div className={`flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-orange-600 group-hover:text-white transition-all ${libraryView === 'grid' ? "w-12 h-12" : "w-10 h-10"}`}>
                            <FolderPlus className={libraryView === 'grid' ? "w-6 h-6" : "w-5 h-5"} />
                          </div>
                          <div className={libraryView === 'list' ? "text-left" : "text-center"}>
                            <p className="text-sm font-medium text-white">添加文件夹</p>
                            <p className="text-[10px] text-gray-500">上传整个文件夹</p>
                          </div>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tag Management Modal */}
      <AnimatePresence>
        {showTagManagement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-[#0A0A0B]/80 backdrop-blur-md" onClick={() => setShowTagManagement(false)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#1E1E22] rounded-[2rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">标签管理</h2>
                <button 
                  onClick={() => setShowTagManagement(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Add Tag Input */}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="输入新标签名称"
                    className="flex-1 h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                  <button 
                    onClick={() => {
                      if (newTagName.trim() && !materialCategories.includes(newTagName.trim())) {
                        setMaterialCategories([...materialCategories, newTagName.trim()]);
                        setNewTagName("");
                      }
                    }}
                    className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Tag List */}
                <div className="max-h-[400px] overflow-y-auto scrollbar-hide space-y-2 pr-2">
                  <p className="text-sm text-gray-500 mb-2 px-1">所有标签：</p>
                  {(materialCategories || []).map((cat, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl group border border-transparent hover:border-white/10 transition-all">
                      {editingTag?.index === index ? (
                        <input 
                          autoFocus
                          value={editingTag.name}
                          onChange={(e) => setEditingTag({ ...editingTag, name: e.target.value })}
                          onBlur={() => {
                            if (editingTag.name.trim()) {
                              const oldName = materialCategories[index];
                              const newName = editingTag.name.trim();
                              const newCats = [...materialCategories];
                              newCats[index] = newName;
                              setMaterialCategories(newCats);
                              
                              // Also update any materials using this category
                              setMaterials((materials || []).map(m => m.category === oldName ? { ...m, category: newName } : m));
                              if (libraryCategory === oldName) setLibraryCategory(newName);
                            }
                            setEditingTag(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.currentTarget.blur();
                            }
                          }}
                          className="flex-1 bg-transparent border-none text-white focus:outline-none"
                        />
                      ) : (
                        <span className="flex-1 text-white font-medium pl-1">{cat}</span>
                      )}
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setEditingTag({ index, name: cat })}
                          className="px-3 py-1.5 bg-blue-600/10 text-blue-400 text-xs rounded-lg hover:bg-blue-600 hover:text-white transition-all sm:opacity-0 sm:group-hover:opacity-100"
                        >
                          编辑
                        </button>
                        <button 
                          onClick={() => removeMaterialTag(cat)}
                          className="px-3 py-1.5 bg-red-500/10 text-red-500 text-xs rounded-lg hover:bg-red-500 hover:text-white transition-all sm:opacity-0 sm:group-hover:opacity-100"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setZoomItem(null)}
          >
            {/* Close Button */}
            <button 
              onClick={() => setZoomItem(null)}
              className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[320] w-12 h-12 flex items-center justify-center bg-white/5 rounded-full backdrop-blur-md border border-white/10"
              title="关闭 (Esc)"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              layoutId={`zoom-${zoomItem.id}`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`relative max-w-7xl w-full max-h-[85vh] flex flex-col items-center justify-center ${zoomItem.displayType === "other" ? "" : "gap-6"}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Buttons Inside Card Container */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrevZoom(); }}
                  className="absolute -left-6 md:-left-24 text-white/50 hover:text-white transition-all z-[320] w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/10 hover:scale-110 active:scale-95 group pointer-events-auto"
                >
                  <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:-translate-x-1" />
                </button>

                <button 
                  onClick={(e) => { e.stopPropagation(); handleNextZoom(); }}
                  className="absolute -right-6 md:-right-24 text-white/50 hover:text-white transition-all z-[320] w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/10 hover:scale-110 active:scale-95 group pointer-events-auto"
                >
                  <ChevronRight className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              
              {/* Image Container - scaled for "other" type */}
              <div className={`flex flex-col items-center ${zoomItem.displayType === "other" ? "scale-[0.78] origin-center" : ""}`}>
                {/* Get displayType for aspect ratio from zoomItem */}
                {(() => {
                  let aspectClass = "max-w-full max-h-[85vh]";
                  const displayType = zoomItem.displayType;
                  if (displayType) {
                    switch (displayType) {
                      case "1:1":
                        aspectClass = "w-full max-w-[72vh] aspect-square";
                        break;
                      case "9:16":
                        aspectClass = "w-full max-w-[46vh] aspect-[9/16]";
                        break;
                      case "16:9":
                        aspectClass = "w-full max-w-[112vh] aspect-video";
                        break;
                      case "4:3":
                        aspectClass = "w-full max-w-[105vh] aspect-[4/3]";
                        break;
                      case "3:4":
                        aspectClass = "w-full max-w-[66vh] aspect-[3/4]";
                        break;
                      case "other":
                        aspectClass = "max-w-[85vw] max-h-[85vh] w-fit h-fit";
                        break;
                    }
                  }
                  
                  return (
                    <div className={`${aspectClass} relative rounded-2xl shadow-2xl border border-white/10 bg-neutral-900 flex-shrink-0 overflow-hidden flex items-center justify-center`}>
                      {zoomItem.type === 'video' || zoomItem.image.endsWith('.mp4') || zoomItem.image.includes('video') ? (
                        <video 
                          src={zoomItem.image} 
                          autoPlay 
                          controls 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLVideoElement;
                            target.style.display = 'none';
                            const imgElement = target.nextElementSibling as HTMLImageElement;
                            if (imgElement) imgElement.style.display = 'block';
                          }}
                        />
                      ) : null}
                      <img 
                        src={zoomItem.image} 
                        alt={zoomItem.title} 
                        className={`${(zoomItem.type === 'video' || zoomItem.image.endsWith('.mp4') || zoomItem.image.includes('video')) ? 'hidden' : ''} ${displayType === "other" ? "max-w-[85vw] max-h-[85vh] w-auto h-auto object-contain" : "w-full h-full object-cover transition-all"}`} 
                      />
                    </div>
                  );
                })()}
              </div>

              {/* Caption - outside scaled container to maintain original size */}
              <div className={`text-center flex-shrink-0 ${zoomItem.displayType === "other" ? "-mt-16" : "mt-4"}`}>
                {zoomItem.title && zoomItem.title !== "新作品" && (
                  <h3 className="text-xl font-bold text-white mb-2">{zoomItem.title}</h3>
                )}
                {zoomItem.tags && zoomItem.tags.some((tag: string) => tag && tag.trim() !== "" && tag !== "设计") && (
                  <div className="flex justify-center gap-2 mb-4">
                    {zoomItem.tags.filter((tag: string) => tag && tag.trim() !== "" && tag !== "设计").map((tag: string) => (
                      <span key={tag} className="text-xs text-white/40">#{tag}</span>
                    ))}
                  </div>
                )}
                <div className="inline-flex items-center gap-4 bg-black/40 backdrop-blur-md border border-white/10 py-2.5 px-5 rounded-full shadow-2xl">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-lg text-white/80 text-sm border border-white/10 shadow-sm">←</div>
                    <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-lg text-white/80 text-sm border border-white/10 shadow-sm">→</div>
                  </div>
                  <span className="text-[13px] text-white/60 font-medium tracking-tight">按键盘上的方向键可以切换项目</span>
                  <span className="text-[13px] text-white/30 font-medium">|</span>
                  <div className="w-7 h-7 flex items-center justify-center bg-white/10 rounded-lg text-white/80 text-xs border border-white/10 shadow-sm font-bold">ESC</div>
                  <span className="text-[13px] text-white/60 font-medium tracking-tight">按键盘上的ESC键可以返回</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category Edit Modal */}
      <AnimatePresence>
        {showCategoryEditModal && editingCategory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center px-4"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowCategoryEditModal(false)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-[#0A0A0B] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="p-8 md:p-12 space-y-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                      <Pencil className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {editingCategory.oldName ? "编辑项目分类" : "添加项目分类"}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-medium">
                        {editingCategory.oldName ? "Edit Project Category" : "Add Project Category"}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowCategoryEditModal(false)}
                    className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3 md:col-span-1">
                    <label className="text-sm font-medium text-gray-400 ml-1">分类名称</label>
                    <input 
                      type="text" 
                      value={editingCategory.newName}
                      onChange={(e) => setEditingCategory({ ...editingCategory, newName: e.target.value })}
                      className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white text-lg placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all"
                      placeholder="输入分类名称"
                    />
                  </div>
                  <div className="space-y-3 md:col-span-1">
                    <label className="text-sm font-medium text-gray-400 ml-1">展示选择</label>
                    <select 
                      value={editingCategory.displayType}
                      onChange={(e) => setEditingCategory({ ...editingCategory, displayType: e.target.value })}
                      className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl px-6 text-white text-lg focus:outline-none focus:border-blue-500/50 appearance-none transition-all"
                    >
                      {DISPLAY_TYPES.map(type => (
                        <option key={type.value} value={type.value} className="bg-[#0A0A0B] text-white py-2">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <button 
                    onClick={() => setShowCategoryEditModal(false)}
                    className="flex-1 h-16 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold transition-all duration-300 border border-white/5"
                  >
                    取消
                  </button>
                  <button 
                    onClick={() => {
                      updateCategory(editingCategory.oldName, editingCategory.newName, editingCategory.displayType);
                      setShowCategoryEditModal(false);
                    }}
                    className="flex-1 h-16 bg-white text-black hover:bg-gray-200 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-white/10 transition-all duration-300"
                  >
                    <Save className="w-5 h-5" />
                    {editingCategory.oldName ? "保存修改" : "添加分类"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
