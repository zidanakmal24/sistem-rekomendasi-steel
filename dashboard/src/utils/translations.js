export const translations = {
  en: {
    // General
    dashboard: 'Industrial Energy Dashboard',
    exportCsv: 'Export CSV',
    exportPdf: 'Export PDF',
    
    // Sidebar
    navOverview: 'Overview',
    navAnalytics: 'Analytics',
    navClustering: 'Clustering',
    navPrediction: 'Prediction',
    navRecommendation: 'Recommendation',
    navInsights: 'Smart Insights',
    navAbout: 'About',
    systemOnline: 'System Online',

    // Overview
    ovTitle: 'Dashboard Overview',
    ovSubtitle: 'High-level summary of industrial energy consumption and emissions.',
    ovTotalRecords: 'Total Records',
    ovAvgEnergy: 'Avg Energy (kWh)',
    ovAvgCO2: 'Avg CO2 Emission',
    ovActiveClusters: 'Active Clusters',
    ovModelScore: 'Model R² Score',
    ovTrends: 'Energy & CO2 Trends (Last 30 Days)',
    ovDistribution: 'Operation Load Distribution',

    // Analytics
    anTitle: 'Deep Analytics',
    anSubtitle: 'Detailed distributions and comparative analysis.',
    anAll: 'All',
    anWeekday: 'Weekday',
    anWeekend: 'Weekend',
    anDayOfWeek: 'Average Energy & CO2 by Day of Week',
    anHistogram: 'Energy Usage Histogram',
    anHeatmap: 'Correlation Heatmap',
    anHeatmapSub: 'A visual representation of the correlation matrix between different energy parameters.',
    anInteractive: 'Interactive Model Loaded',

    // Clustering
    clTitle: 'K-Means Clustering',
    clSubtitle: 'Visualizing operational states based on energy consumption and CO2 emissions.',
    clDist: 'Cluster Distribution (Usage vs CO2)',
    clProfiles: 'Cluster Profiles',
    clAvgUsage: 'Avg Usage',
    clAvgCO2: 'Avg CO2',
    
    // Prediction
    prTitle: 'Energy Prediction Simulator',
    prSubtitle: 'Input operational parameters to predict energy consumption and cluster assignment.',
    prInputParams: 'Input Parameters',
    prWeekStatus: 'Week Status',
    prDayOfWeek: 'Day Of Week',
    prLoadType: 'Load Type',
    prHour: 'Hour (0-23)',
    prNsm: 'NSM (Seconds from Midnight)',
    prPowerFactor: 'Power Factor',
    prReactivePower: 'Reactive Power',
    prRunModel: 'Run Prediction Model',
    prAnalyzing: 'Analyzing Data...',
    prResults: 'Prediction Results',
    prSubmitToView: 'Submit parameters to view the prediction.',
    prRunningModel: 'Running Random Forest Regressor...',
    prPredEnergy: 'Predicted Energy',
    prPredCO2: 'Predicted CO2',
    prPredCluster: 'Predicted Cluster Assignment',
    prConfidence: 'Model Confidence',

    // Recommendation
    rcTitle: 'Constraint-Based Recommendations',
    rcSubtitle: 'Find the optimal operating hours based on your energy and emission constraints.',
    rcConstraints: 'Set Constraints',
    rcMaxEnergy: 'Maximum Energy Usage',
    rcMaxCO2: 'Maximum CO2 Emission',
    rcPreferredDay: 'Preferred Day',
    rcFindWindows: 'Find Optimal Windows',
    rcRecHours: 'Recommended Operating Hours',
    rcAdjust: 'Adjust constraints and click find to see recommendations.',
    rcSchedule: 'Schedule',
    rcNoRecs: 'No Recommendations Found',
    rcTooRestrictive: 'Your current constraints are too restrictive for the chosen day.',
    rcSuggested: 'Suggested Actions',
    rcSug1: 'Increase maximum energy threshold',
    rcSug2: 'Increase maximum CO2 threshold',
    rcSug3: 'Change operating day to a Weekend',

    // Smart Insights
    siTitle: 'AI-Powered Smart Insights',
    siSubtitle: 'Automated analysis and actionable recommendations derived from your dataset.',
    siViewDetails: 'View Details',
    siReportTitle: 'Need a custom analysis report?',
    siReportDesc: 'Our AI can generate a comprehensive PDF detailing optimization strategies specific to your plant.',
    siGenReport: 'Generate Report',

    // About
    abTitle: 'Industrial Energy Optimization Dashboard',
    abSubtitle: 'A comprehensive analytics and recommendation platform designed to help industrial facilities monitor, predict, and optimize their energy consumption and carbon footprint.',
    abFrontend: 'Frontend Stack',
    abCore: 'Core Features',
    abContext: 'Project Context',
    abContextDesc: 'This dashboard was developed to transition a Python/Streamlit based data science model into a professional, scalable web interface. The current iteration uses simulated mock data representing industrial energy logs (Usage kWh, CO2 emissions, Load Types, Power Factor, etc.) to demonstrate the UI capabilities and data flows before backend integration.'
  },
  id: {
    // General
    dashboard: 'Dashboard Energi Industri',
    exportCsv: 'Ekspor CSV',
    exportPdf: 'Ekspor PDF',
    
    // Sidebar
    navOverview: 'Ringkasan',
    navAnalytics: 'Analitik',
    navClustering: 'Klastering',
    navPrediction: 'Prediksi',
    navRecommendation: 'Rekomendasi',
    navInsights: 'Wawasan Cerdas',
    navAbout: 'Tentang',
    systemOnline: 'Sistem Aktif',

    // Overview
    ovTitle: 'Ringkasan Dashboard',
    ovSubtitle: 'Ringkasan tingkat tinggi tentang konsumsi energi dan emisi industri.',
    ovTotalRecords: 'Total Data',
    ovAvgEnergy: 'Rata-rata Energi (kWh)',
    ovAvgCO2: 'Rata-rata Emisi CO2',
    ovActiveClusters: 'Klaster Aktif',
    ovModelScore: 'Skor Model R²',
    ovTrends: 'Tren Energi & CO2 (30 Hari Terakhir)',
    ovDistribution: 'Distribusi Beban Operasi',

    // Analytics
    anTitle: 'Analitik Mendalam',
    anSubtitle: 'Distribusi rinci dan analisis komparatif.',
    anAll: 'Semua',
    anWeekday: 'Hari Kerja',
    anWeekend: 'Akhir Pekan',
    anDayOfWeek: 'Rata-rata Energi & CO2 Berdasarkan Hari',
    anHistogram: 'Histogram Penggunaan Energi',
    anHeatmap: 'Peta Panas Korelasi',
    anHeatmapSub: 'Representasi visual dari matriks korelasi antara parameter energi yang berbeda.',
    anInteractive: 'Model Interaktif Dimuat',

    // Clustering
    clTitle: 'Klastering K-Means',
    clSubtitle: 'Memvisualisasikan status operasional berdasarkan konsumsi energi dan emisi CO2.',
    clDist: 'Distribusi Klaster (Energi vs CO2)',
    clProfiles: 'Profil Klaster',
    clAvgUsage: 'Rata-rata Energi',
    clAvgCO2: 'Rata-rata CO2',
    
    // Prediction
    prTitle: 'Simulator Prediksi Energi',
    prSubtitle: 'Masukkan parameter operasional untuk memprediksi konsumsi energi dan penugasan klaster.',
    prInputParams: 'Parameter Input',
    prWeekStatus: 'Status Minggu',
    prDayOfWeek: 'Hari dalam Seminggu',
    prLoadType: 'Tipe Beban',
    prHour: 'Jam (0-23)',
    prNsm: 'NSM (Detik dari Tengah Malam)',
    prPowerFactor: 'Faktor Daya',
    prReactivePower: 'Daya Reaktif',
    prRunModel: 'Jalankan Model Prediksi',
    prAnalyzing: 'Menganalisis Data...',
    prResults: 'Hasil Prediksi',
    prSubmitToView: 'Kirim parameter untuk melihat prediksi.',
    prRunningModel: 'Menjalankan Regresi Random Forest...',
    prPredEnergy: 'Prediksi Energi',
    prPredCO2: 'Prediksi CO2',
    prPredCluster: 'Prediksi Penugasan Klaster',
    prConfidence: 'Kepercayaan Model',

    // Recommendation
    rcTitle: 'Rekomendasi Berbasis Batasan',
    rcSubtitle: 'Temukan jam operasional optimal berdasarkan batasan energi dan emisi Anda.',
    rcConstraints: 'Atur Batasan',
    rcMaxEnergy: 'Penggunaan Energi Maksimal',
    rcMaxCO2: 'Emisi CO2 Maksimal',
    rcPreferredDay: 'Hari Pilihan',
    rcFindWindows: 'Temukan Jendela Waktu Optimal',
    rcRecHours: 'Jam Operasional Rekomendasi',
    rcAdjust: 'Sesuaikan batasan dan klik temukan untuk melihat rekomendasi.',
    rcSchedule: 'Jadwalkan',
    rcNoRecs: 'Tidak Ada Rekomendasi Ditemukan',
    rcTooRestrictive: 'Batasan Anda saat ini terlalu ketat untuk hari yang dipilih.',
    rcSuggested: 'Tindakan yang Disarankan',
    rcSug1: 'Tingkatkan batas maksimum energi',
    rcSug2: 'Tingkatkan batas maksimum CO2',
    rcSug3: 'Ubah hari operasi menjadi Akhir Pekan',

    // Smart Insights
    siTitle: 'Wawasan Cerdas AI',
    siSubtitle: 'Analisis otomatis dan rekomendasi yang dapat ditindaklanjuti dari dataset Anda.',
    siViewDetails: 'Lihat Detail',
    siReportTitle: 'Butuh laporan analisis khusus?',
    siReportDesc: 'AI kami dapat menghasilkan PDF komprehensif yang merinci strategi optimalisasi khusus untuk pabrik Anda.',
    siGenReport: 'Hasilkan Laporan',

    // About
    abTitle: 'Dashboard Optimalisasi Energi Industri',
    abSubtitle: 'Platform analitik dan rekomendasi komprehensif yang dirancang untuk membantu fasilitas industri memantau, memprediksi, dan mengoptimalkan konsumsi energi dan jejak karbon mereka.',
    abFrontend: 'Teknologi Frontend',
    abCore: 'Fitur Utama',
    abContext: 'Konteks Proyek',
    abContextDesc: 'Dashboard ini dikembangkan untuk mentransisikan model data science berbasis Python/Streamlit ke antarmuka web profesional yang terukur. Versi saat ini menggunakan mock data simulasi (Penggunaan kWh, emisi CO2, Tipe Beban, Faktor Daya, dll) untuk mendemonstrasikan kemampuan UI sebelum integrasi backend.'
  }
};
