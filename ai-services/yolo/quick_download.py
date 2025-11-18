"""
Download pre-configured waste detection dataset
Uses Roboflow API - easier than manual download
"""

def download_with_roboflow_api():
    """
    Download dataset using Roboflow Python library
    This works without needing to navigate the website
    """
    try:
        from roboflow import Roboflow
        
        print("=" * 70)
        print("📥 Downloading Waste Detection Dataset via Roboflow API")
        print("=" * 70)
        
        # Public waste detection dataset
        # No API key needed for public datasets
        rf = Roboflow(api_key="placeholder")
        
        print("\n🔍 Accessing public waste detection dataset...")
        print("   This may take a few minutes depending on dataset size...\n")
        
        # Try multiple public datasets
        datasets_to_try = [
            {
                'workspace': 'brad-dwyer',
                'project': 'taco-trash-annotations-in-context',
                'version': 1,
                'name': 'TACO Dataset'
            },
            {
                'workspace': 'roboflow-100',
                'project': 'trash-detection',
                'version': 2,
                'name': 'Trash Detection'
            }
        ]
        
        for dataset_info in datasets_to_try:
            try:
                print(f"Trying: {dataset_info['name']}...")
                project = rf.workspace(dataset_info['workspace']).project(dataset_info['project'])
                dataset = project.version(dataset_info['version']).download("yolov8", location=".")
                
                print(f"\n✅ SUCCESS! Dataset downloaded to: {dataset.location}")
                print("\n📊 Next steps:")
                print("   1. Check the downloaded folder")
                print("   2. Run: python start_training.py")
                return dataset.location
                
            except Exception as e:
                print(f"   ⚠️  Failed: {e}")
                continue
        
        print("\n❌ Could not download any dataset automatically")
        show_manual_instructions()
        
    except ImportError:
        print("\n❌ Roboflow library not installed")
        print("Installing now...")
        import subprocess
        subprocess.run(["pip", "install", "roboflow"], check=True)
        print("\n✅ Installed! Run this script again.")


def show_manual_instructions():
    """Show manual download instructions"""
    print("\n" + "=" * 70)
    print("📝 MANUAL DOWNLOAD INSTRUCTIONS")
    print("=" * 70)
    
    print("\n1️⃣  Open your browser and go to:")
    print("   https://app.roboflow.com/")
    
    print("\n2️⃣  Create FREE account (email + password)")
    
    print("\n3️⃣  After login, go to:")
    print("   https://universe.roboflow.com/brad-dwyer/taco-trash-annotations-in-context")
    
    print("\n4️⃣  Click the purple 'Download Dataset' button")
    
    print("\n5️⃣  Select format: 'YOLOv8'")
    
    print("\n6️⃣  Click 'Continue' (it's free)")
    
    print("\n7️⃣  Download will start automatically")
    
    print("\n8️⃣  Extract the ZIP file to:")
    print(f"   {os.path.abspath('.')}")
    
    print("\n9️⃣  You should now have:")
    print("   - images/train/")
    print("   - images/val/")
    print("   - images/test/")
    print("   - labels/train/")
    print("   - labels/val/")
    print("   - labels/test/")
    print("   - data.yaml")
    
    print("\n🚀 Then run: python start_training.py")
    print("=" * 70)


if __name__ == "__main__":
    import os
    
    print("\n🗑️  EcoSynk Waste Detection Dataset Downloader\n")
    
    # Check if already has data
    if os.path.exists("images/train") and len(os.listdir("images/train")) > 0:
        print("✅ Dataset already exists!")
        print(f"   Images found: {len(os.listdir('images/train'))}")
        response = input("\nDownload anyway? (y/n): ").strip().lower()
        if response != 'y':
            print("Cancelled.")
            exit()
    
    download_with_roboflow_api()
